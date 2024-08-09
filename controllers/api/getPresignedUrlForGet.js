const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// Initialize the S3 client
const s3Client = new S3Client({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});


// Function to generate a presigned URL for getObject operation
async function getPresignedUrlForGet(objectKey) {
	console.log("getPresignedUrlForGet objectKet ", objectKey)
	const bucketName = process.env.S3_BUCKET_NAME;
	console.log("getPresignedUrlForGet bucketName ", bucketName)
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });
	
	console.log("getPresignedUrlForGet command ", command)
  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 120 }); // Expires in 60 seconds
		console.log("getPresignedUrlForGet url ", url)
    return url;
  } catch (err) {
    console.error("getPresignedUrlForGet Error generating presigned URL", err);
    throw err;
  }
}

/*
const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION
});

// Create an S3 instance
const s3 = new AWS.S3();

function getPresignedUrl(bucketName, objectKey) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Expires: 60 // Time in seconds until the presigned URL expires
    };

    // Generate a presigned URL for getObject operation
    s3.getSignedUrl('getObject', params, (err, url) => {
      if (err) {
        //console.log("s3.getSignedUrl error: ", err)
        reject(err);
      } else {
        //console.log("s3.getSignedUrl url: ", url)
        resolve(url);
      }
    });
  });
}
*/

module.exports = getPresignedUrlForGet;
