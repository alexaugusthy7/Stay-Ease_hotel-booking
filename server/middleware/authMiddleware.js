import jwt from "jsonwebtoken";

import User from "../models/User.js";


const authMiddleware =
  async (req, res, next) => {

  try {

    // Get Authorization Header
    const authHeader =
      req.headers.authorization;

    // Check token exists
    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {

      return res.status(401).json({
        message: "Unauthorized",
      });

    }


    // Extract token
    const token =
      authHeader.split(" ")[1];


    // Verify token
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );


    // Find user
    const user =
      await User.findById(
        decoded.id
      ).select("-password");


    // Attach user to request
    req.user = user;


    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      message: "Invalid token",
    });

  }
};

export default authMiddleware;