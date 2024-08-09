const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// Initialize the S3 client
const s3Client = new S3Client({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});
/*
 * Function to generate a presigned URL for a PUT operation
 * @param {string} bucketName - The name of the S3 bucket
 * @param {string} objectKey - The key of the object to be uploaded
 * @param {number} expiresIn - The expiration time in seconds
 * @returns {Promise<string>} - The presigned URL
 */
async function getPresignedUrlForPut(objectKey, expiresIn = 60) {
	const bucketName = process.env.S3_BUCKET_NAME;
    // Define the parameters for the PutObjectCommand
		console.log("getPresignedUrlForPut expiresIn ", expiresIn)
    const params = {
        Bucket: bucketName,
        Key: objectKey,
        //ContentType: "application/octet-stream" // Default content type, can be overridden
    };

    // Create a PutObjectCommand
    const command = new PutObjectCommand(params);

    // Generate a presigned URL
    const url = await getSignedUrl(s3Client, command, { expiresIn });

    return url;
}

// Example usage
/*
getPresignedUrlForPut("your-bucket-name", "your-object-key")
    .then(url => {
        console.log("Presigned URL for PUT:", url);
    })
    .catch(error => {
        console.error("Error generating presigned URL for PUT:", error);
    });
*/

module.exports = getPresignedUrlForPut;