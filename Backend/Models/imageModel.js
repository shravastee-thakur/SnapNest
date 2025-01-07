import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    ImageURL: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const imageModel = mongoose.model("image", imageSchema);

export default imageModel;
