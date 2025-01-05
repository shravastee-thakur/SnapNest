import userModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .send({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send({
      success: true,
      data: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }

    const ifUserExists = await userModel.findOne({ email });
    if (!ifUserExists) {
      return res.status(400).send("User does not exist");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      ifUserExists.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .send({ success: false, message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { userId: ifUserExists._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    

    res.status(200).send({
      success: true,
      token,
      message: "User logged in successfully",
      data: ifUserExists,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
