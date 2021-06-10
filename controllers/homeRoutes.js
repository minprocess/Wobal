const router = require('express').Router();
const { Posts , User, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postsData = await Posts.findAll();

    const posts = postsData.map((posts) => posts.get({ plain: true }));

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

// To create a post
router.post('/', async (req, res) => {
  try {
    const postsData = await Posts.create (req.body);
    res.status(200).json(postsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// To create a comment
router.post('/', async (req, res) => {
  try {
    const commentData = await Comments.create (req.body);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// To create a user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create (req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
