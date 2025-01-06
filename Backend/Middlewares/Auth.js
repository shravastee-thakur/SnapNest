import jwt from "jsonwebtoken";

// export const AuthCheck = async (req, res, next) => {
//   try {
//     const authtoken = req.headers["authorization"];

//     if (!authtoken) {
//       return res.send({ success: false, message: "invalid token" });
//     }

//     const decodevalue = await jwt.verify(authtoken, process.env.JWT_SECRET);
//     console.log(decodevalue);
//     req.user = decodevalue;
//     next();
//   } catch (error) {
//     console.log(error);
//     res
//       .status(403)
//       .json({ message: "Unauthorized, JWT token is wrong or expired" });
//   }
// };

export const AuthCheck = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or missing token" });
    }

    const authtoken = authHeader.split(" ")[1]; // Extract token from Bearer prefix

    const decodevalue = await jwt.verify(authtoken, process.env.JWT_SECRET);
    console.log(decodevalue);
    req.user = decodevalue;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res
      .status(403)
      .json({ message: "Unauthorized, JWT token is wrong or expired" });
  }
};
