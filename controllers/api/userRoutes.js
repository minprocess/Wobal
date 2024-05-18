const router = require('express').Router();
const { User, Posts, Comments } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// To create a post
router.post('/post', (req, res) => {
  Posts.create({
    photo: req.body.photo,
    name: req.body.name,
    description: req.body.description,
    user_id: req.session.user_id
  })
    .then(newPost => res.status(200).json(newPost))
    .catch(err => {
      console.log(err)
      res.status(400).json(err)

    })

});

// To create a comment
router.post('/comment', async (req, res) => {
  try {
    const commentData = await Comments.create(req.body);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// To create a user
router.post('/newuser', async (req, res) => {
  console.log(req.body);
  User.create({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    fullname: req.body.fullname
  })
    .then(newUser => res.status(200).json(newUser))
    .catch(err => res.status(400).json(err))
});

// To update a user pic
router.put('/user', async (req, res) => {
  console.log(req.body);
  User.update(
    { profile_pic: req.body.userphoto },
    { where: { id: req.session.user_id } })
    .then(newUser => res.status(200).json(newUser))
    .catch(err => res.status(400).json(err))
});

// to remove pfp
router.put('/nophoto', async (req, res) => {
  console.log(req.body);
  User.update(
    { profile_pic: null },
    { where: { id: req.session.user_id } })
    .then(newUser => res.status(200).json(newUser))
    .catch(err => res.status(400).json(err))
});

router.get('/searchUser/:query', async (req, res) => {
    console.log(req.params.query);
    User.findAll({
      where: {
        fullname: req.params.query
      }
    })
    .then(userData => res.status(200).json(userData))
    .catch(err => res.status(400).json(err))
});

router.post('/newComment', async (req, res) => {
  console.log(req.body);
  Comments.create({
    commentText: req.body.commentData,
    user_id: req.session.user_id,
    post_id: req.body.post_id
  })
    .then(newComment => res.status(200).json(newComment))
    .catch(err => res.status(400).json(err))
});

module.exports = router;
