import express from "express";
import upload from "../Middlewares/imageUploader.js";
import { uploadController } from "../Controllers/imageController.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadController);

export default router;
