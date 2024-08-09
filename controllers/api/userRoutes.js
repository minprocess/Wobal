const router = require("express").Router();
const { User, Posts, Comments } = require("../../models");
const uploadImageToS3 = require("./uploadImageToS3");
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const getGetPresignedUrl = require('./getPresignedUrlForGet');
const getPutPresignedUrl = require('./getPresignedUrlForPut');

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

// Initialize the S3 client
const s3Client = new S3Client({ region: process.env.AWS_REGION });

router.post("/", async (req, res) => {
  console.log("userRoutes.js router.post req.body", req.body);
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

router.post("/login", async (req, res) => {
  console.log("userRoutes.js router.post /login");
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  console.log("userRoutes.js router.post /logout");

  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// returns a presigned URL for a GET request
router.post("/getpresignedurlforget", async (req, res) => {
	console.log("/getpresignedurlforget req.body", req.body.fname);
	try {
		const presignedUrl = await getPresignedUrlForGet(req.body.fname);
		console.log("/getpresignedurlforget presignedUrl", presignedUrl);
		res.status(200).send(presignedUrl);
		//res.status(200).json(presignedUrl);
	} catch (err) {
			console.error("/getpresignedurlforget", err);
			res.status(400).send('err')
			//res.status(400).json(err);
	}
});

// returns a presigned URL for a PUT request
router.post("/getpresignedurlforput", async (req, res) => {
	console.log("/getpresignedurlforput req.body", req.body);
	try {
		const presignedUrl = await getPutPresignedUrl(req.body.fname);
		console.log("/getpresignedurlforput presignedUrl", presignedUrl);
		res.status(200).send(presignedUrl);
		//res.status(200).json(presignedUrl);
	} catch (err) {
			console.error("/getpresignedurlforput error", err);
			res.status(400).send('err')
			//res.status(400).json(err);
	}
});

// To create a post
// In public/js/newpost.js
router.post("/post", (req, res) => {
	let photo = req.body.photo;
	console.log("    ");
  console.log("*** userRoutes.js router.post /post photo", photo);

	/*
	const bucketName = process.env.S3_BUCKET_NAME; // Ensure your environment variable is correctly set
	{
		getPresignedUrl(bucketName, photo)
			.then((url) => {
				photo = url;
			})
			.catch((err) => console.log("Error generating presigned URL creating", err));
	}
  console.log("*** userRoutes.js router.post /post req.body after presign", photo);
	console.log("    ");
*/
	
  //console.log("*** userRoutes.js router.post photo", req.body.photo);
  Posts.create({
    photo: photo,
    name: req.body.name,
    description: req.body.description,
    user_id: req.session.user_id,
  })
    .then((newPost) => res.status(200).json(newPost))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
	
});

router.post("/uploadpic", (req, res) => {
	console.log("    ");
	console.log("userRoutes.js router.post /uploadpic req.file", req.file);
  const bucketName = process.env.S3_BUCKET_NAME;
  const file = req.file;
  const key = `uploads/${file.originalname}`;

  uploadPicToS3(file, bucketName, key)
    .then((success) => res.status(200).json({ message: 'File uploaded successfully', data: success }))
    .catch((error) => res.status(500).json({ message: 'Error uploading file', error: error.message }));
});

router.post("/uploadpic2", upload.single('file'), (req, res) => {
	console.log("    ");
	console.log("userRoutes.js router.post /uploadpic req.file", req.file);
  const bucketName = process.env.S3_BUCKET_NAME;
  const file = req.file;
  const key = `uploads/${file.originalname}`;

  uploadPicToS3(file, bucketName, key)
    .then((success) => res.status(200).json({ message: 'File uploaded successfully', data: success }))
    .catch((error) => res.status(500).json({ message: 'Error uploading file', error: error.message }));
});

const uploadPicToS3 = async (file, bucketName, key) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Key: key,
    Body: fileStream,
    ContentType: file.mimetype
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    return data;
  } catch (err) {
    throw err;
  }
};

router.post("/api-s3upload", (req, res) => {
  // Assume 'file' is a File object from an <input type="file" /> element,
  // 'your-bucket-name' is your S3 bucket name, and 'your-object-key' is the key for the object in the bucket.
  const bucketName = process.env.S3_BUCKET_NAME;
	console.log("    ");
  console.log("req.body", req.body);
	console.log("    ");
  uploadImageToS3(file, bucketName, "/moreimages/catsanddogs.jpg") // req.body.key is the photo filename
    .then((success) => console.log("Success:", success))
    .catch((error) => console.error("Error:", error));
});

// To create a comment
router.post("/comment", async (req, res) => {
  console.log("userRoutes.js router.post /comment");
  try {
    const commentData = await Comments.create(req.body);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// To create a user
router.post("/newuser", async (req, res) => {
  console.log("userRoutes.jg post /newuser req.body", req.body);
  User.create({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    fullname: req.body.fullname,
  })
    .then((newUser) => res.status(200).json(newUser))
    .catch((err) => res.status(400).json(err));
});

// To update a user pic
router.put("/user", async (req, res) => {
  console.log("userRoutes.js put /user", req.body);
  User.update(
    { profile_pic: req.body.userphoto },
    { where: { id: req.session.user_id } },
  )
    .then((newUser) => res.status(200).json(newUser))
    .catch((err) => res.status(400).json(err));
});

// to remove pfp
router.put("/nophoto", async (req, res) => {
  console.log("userRoutes.js put /nophoto req.body", req.body);
  User.update({ profile_pic: null }, { where: { id: req.session.user_id } })
    .then((newUser) => res.status(200).json(newUser))
    .catch((err) => res.status(400).json(err));
});

router.get("/searchUser/:query", async (req, res) => {
  console.log("userRoutes.js .get /searchUser/:query ", req.params.query);
  User.findAll({
    where: {
      fullname: req.params.query,
    },
  })
    .then((userData) => res.status(200).json(userData))
    .catch((err) => res.status(400).json(err));
});

router.post("/newComment", async (req, res) => {
  console.log("userRoutes post /newComment req.body", req.body);
  Comments.create({
    commentText: req.body.commentData,
    user_id: req.session.user_id,
    post_id: req.body.post_id,
  })
    .then((newComment) => res.status(200).json(newComment))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
