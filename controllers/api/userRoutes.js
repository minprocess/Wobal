const router = require('express').Router();
const { User, Posts, Comments  } = require('../../models');

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
  try {
    console.log(req.body);
    User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(newUser => res.status(200).json(newUser))
      .catch(err => res.status(400).json(err))
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
