import express from "express";
import upload from "../Middlewares/imageUploader.js";
import { uploadController, getImages } from "../Controllers/imageController.js";
import { AuthCheck } from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/upload", AuthCheck, upload.single("image"), uploadController);

router.get("/getImages", AuthCheck, getImages);

export default router;
