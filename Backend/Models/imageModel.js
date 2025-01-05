import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    imageURL: {
      type: String,
    },
  },
  { timestamps: true }
);

const imageModel = mongoose.model("image", imageSchema);

export default imageModel;
