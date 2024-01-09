import AWS from "aws-sdk";
import fs from "fs";
import multer from "multer";
import mime from "mime-types";
// Configure AWS SDK with your credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const addProductImages = async (req, res) => {
  try {
    const file = req.file;
    console.log(file.mimetype);
    // Determine cthe content type based on the file extension
    const contentType = file.mimetype | "application/octet-stream";

    // Set up parameters for S3 upload
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `uploads/${file.originalname}`,
      Body: file.buffer,
      ContentType: contentType.toString(),
    };

    // Upload the file to S3
    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading file to S3:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("File uploaded successfully. S3 Location:", data.Location);
        res.json({ success: true, message: "File uploaded successfully" });
      }
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  addProductImages,
};
