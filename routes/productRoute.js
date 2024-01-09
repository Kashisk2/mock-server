import express from "express";
import productController from "../controller/productController.js";
import multer from "multer";
const router = express.Router();
const upload = multer();
router
  .route("/upload-images")
  .post(upload.single("file"), productController.addProductImages);
export default router;
