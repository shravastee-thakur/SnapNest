import fs from "fs";
import cloudinary from "cloudinary";
import imageModel from "../Models/imageModel.js";

export const uploadController = async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    if (!uploadResult.secure_url) {
      throw new Error("Failed to get secure_url from Cloudinary");
    }

    const newImage = new imageModel({
      ImageURL: uploadResult.secure_url,
      originalName: req.file.originalname,
    });
    await newImage.save();

    // delete the file after uploads
    fs.unlink(req.file.path, function (err) {
      if (err) console.log(err);
      else console.log("\nDeleted file");
    });

    res.status(200).json({
      success: true,
      data: uploadResult,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getImages = async (req, res) => {
  try {
    const images = await imageModel.find();
    if (!images) {
      return res
        .status(404)
        .json({ success: false, message: "No images found" });
    }
    res
      .status(200)
      .json({ success: true, data: images, message: "Images fetched" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
