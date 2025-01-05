import fs from "fs";
import cloudinary from "cloudinary";
import imageModel from "../Models/imageModel.js";

export const uploadController = async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path);

    const newImage = new imageModel({ Image_Url: uploadResult.secure_url });
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
