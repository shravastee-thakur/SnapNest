import jwt from "jsonwebtoken";

export const AuthCheck = async (req, res, next) => {
  try {
    const authtoken = req.headers["authorization"];


    if (!authtoken) {
      return res.send({ success: false, message: "invalid token" });
    }

    const decodevalue = await jwt.verify(authtoken, process.env.JWT_SECRET);
    console.log(decodevalue);
    req.user = decodevalue;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(403)
      .json({ message: "Unauthorized, JWT token is wrong or expired" });
  }
};
