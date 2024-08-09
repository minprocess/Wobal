// Import necessary AWS SDK modules

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fs = require('fs');
const path = require('path');

// Function to upload an image file to S3 using a presigned URL
async function uploadImageToS3(file, bucketName, objectKey) {
  // Initialize the S3 client
  const s3Client = new S3Client({
    region: process.env.S3_BUCKET_REGION,
  });
// Define the path to the JPEG image file
//const filePath = path.join(__dirname, 'image.jpg');

// Read the file synchronously as a binary buffer
const fileBuffer = fs.readFileSync(file);

  // Create a command to put the object
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
    Body: fileBuffer,
    ContentType: file.type, // Set the content type based on the file type
  });

  // Generate a presigned URL for the command
  try {
    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60, // URL expires in 1 hour, adjust as needed
    });

    // Use the fetch API to upload the file using the presigned URL
    const response = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type, // Ensure the content type matches the file type
      },
    });

    if (response.ok) {
      console.log("Upload successful");
      return true;
    } else {
      console.error("Upload failed", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error generating presigned URL or uploading file", error);
    throw error;
  }
}

module.exports = uploadImageToS3;
