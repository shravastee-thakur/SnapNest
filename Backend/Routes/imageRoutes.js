import express from "express";
import upload from "../Middlewares/imageUploader.js";
import { uploadController } from "../Controllers/imageController.js";
import { AuthCheck } from "../Middlewares/Auth.js";

const router = express.Router();

// new code by chatgpt
router.post("/upload", AuthCheck, upload.single("image"), uploadController);

// old code
// router.post("/upload", upload.single("image"), AuthCheck, uploadController);

export default router;
