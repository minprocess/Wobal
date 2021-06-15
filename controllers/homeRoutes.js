const router = require('express').Router();
const { Posts, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      include: [{
        model: Comments
      }]
    });
    const posts = postsData.map((posts) => posts.get({ plain: true }));

// console.log(posts[0].Comments[0].description);
//     console.log(postsData[0].dataValues.Comments)
//     const commentsData = await Comments.findAll();
//     var mappedComments
//     for (let i = 0; i < posts.length; i++) {
//       for(let a = 0; a < (posts[i].Comments).length; a++){
//         mappedComments += posts[i].Comments[a].description
//       }
//     }

// console.log(mappedComments);
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Posts }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

// DELETE a comment in a post in the feed
router.delete('/comment:id', async (req, res) => {
  var theId = req.params.id.replace(':', '');
  try {
    const commentData = await Comments.destroy( {
      where: { id: theId }
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with that id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
