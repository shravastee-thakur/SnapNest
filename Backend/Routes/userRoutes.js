import express from "express";
import {
  LoginController,
  signupController,
} from "../Controllers/userController.js";
import { loginAuth, signupAuth } from "../Middlewares/AuthValidation.js";

const router = express.Router();

router.post("/signup", signupAuth, signupController);

router.post("/login", loginAuth, LoginController);

export default router;
