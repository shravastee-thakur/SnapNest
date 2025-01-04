import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./DB/connectDB.js";

connectDB();

import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./Routes/userRoutes.js";

const PORT = process.env.PORT || 4000;

// Middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});