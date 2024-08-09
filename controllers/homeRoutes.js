const router = require("express").Router();
const { Posts, User, Comments } = require("../models");
const withAuth = require("../utils/auth");
const getPresignedUrl = require("./getPresignedURL");

router.get("/", async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ["fullname"],
        },
        {
          model: Comments,
          include: [
            {
              model: User,
              attributes: ["fullname"],
            },
          ],
        },
      ],
    });

    const posts = postsData.map((posts) => posts.get({ plain: true }));

    const bucketName = process.env.S3_BUCKET_NAME; // Ensure your environment variable is correctly set
    for (let i = 0; i < posts.length; i++) {

      getPresignedUrl(bucketName, posts[i].photo)
        .then((url) => {
          posts[i].photo = url;
        })
        .catch((err) => console.log("Error generating presigned URL", err));
    }

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Posts }],
    });
    const user = userData.get({ plain: true });

    const bucketName = process.env.S3_BUCKET_NAME; // Ensure your environment variable is correctly set
      getPresignedUrl(bucketName, user.profile_pic)
        .then((url) => {
          user.profile_pic = url;
        })
        .catch((err) => console.log("Error generating presigned URL", err));

				for (let i = 0; i < user.posts.length; i++) {

					getPresignedUrl(bucketName, user.posts[i].photo)
						.then((url) => {
							user.posts[i].photo = url;
						})
						.catch((err) => console.log("Error generating presigned URL", err));
				}
		
    res.render("profile", {
      user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  console.log("homeRoutes.js router.get /login");

  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

// DELETE a comment in a post in the feed
router.delete("/comment:id", async (req, res) => {
  var theId = req.params.id.replace(":", "");
  try {
    const commentData = await Comments.destroy({
      where: { id: theId },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with that id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/search", withAuth, async (req, res) => {
  res.render("search", {
    logged_in: true,
  });
});

module.exports = router;
