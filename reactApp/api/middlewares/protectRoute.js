import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  const token = req.cookies["anti-social-token"];

  try {
    if (!token) {
      return res
        .status(401)
        .json({ code: 0, msg: "Access denied. Please login" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decodedToken || !decodedToken.userId) {
      return res
        .status(401)
        .json({ code: 0, msg: "Access denied. Invalid token" });
    }

    const user = await User.findById(decodedToken.userId).select("+password");
    if (!user) {
      return res.status(404).json({ code: 0, msg: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};
