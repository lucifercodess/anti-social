import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import { jwtToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const profilePhoto = req.file;  // This will be populated by multer

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ code: 0, msg: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ code: 0, msg: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ code: 0, msg: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let profilePhotoUrl = null;
    if (profilePhoto) {
      const result = await cloudinary.uploader.upload(profilePhoto.path, {
        folder: "user_profiles",
      });
      profilePhotoUrl = result.secure_url;
    }

    const user = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture: profilePhotoUrl,
    });

    await user.save();
    return res.status(201).json({
      code: 1,
      msg: "User registered successfully",
      user: {
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ code: 0, msg: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ code: 0, msg: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ code: 0, msg: "Invalid credentials" });
    }
    jwtToken(user._id, res);
    return res.status(200).json({
      code: 1,
      msg: "User logged in successfully",
      user: {
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};
export const logout = async (req, res) => {
  const token = req.cookies["anti-social-token"];
  if (!token) {
    return res
      .status(401)
      .json({ code: 0, msg: "already logout, no token to clear" });
  }
  res.clearCookie("anti-social-token");
  return res.status(200).json({ code: 1, msg: "User logged out successfully" });
};
export const getUserProfile = async (req, res) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ code: 0, msg: "User not found" });
    }
    return res.status(200).json({
      code: 1,
      msg: "User profile fetched successfully",
      user: {
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};
