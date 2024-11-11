import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";


export const getProfileBYId = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ code: 0, msg: "User id is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ code: 0, msg: "Invalid user ID format" });
  }
  try {
    const checkUser = await User.findById(id).lean();
    if (!checkUser) {
      return res.status(404).json({ code: 0, msg: "User not found" });
    }
    return res.status(200).json({
      code: 1,
      msg: "User profile fetched successfully",
      user: {
        username: checkUser.username,
        email: checkUser.email,
        profilePicture: checkUser.profilePicture,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  const { email, username, profilePicture } = req.body;
  const id = req.user._id;
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ code: 0, msg: "User not found" });
    }
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePicture = profilePicture || user.profilePicture;
    await user.save();
    return res.status(200).json({
      code: 1,
      msg: "User profile updated successfully",
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
export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ code: 0, msg: "Both old and new passwords are required" });
    }

    console.log("req.user:", req.user);

    const user = req.user;
    console.log("user.password:", user.password);
    if (!user.password) {
      return res
        .status(400)
        .json({ code: 0, msg: "Password is missing in user data" });
    }

    const checkPass = await bcrypt.compare(oldPassword, user.password);
    if (!checkPass) {
      return res.status(401).json({ code: 0, msg: "Incorrect password" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res
      .status(200)
      .json({ code: 1, msg: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};

export const followUser = async (req, res) => {
  const followerId = req.user._id;
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ code: 0, msg: "User ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ code: 0, msg: "Invalid user ID format" });
    }

    if (followerId === id) {
      return res
        .status(400)
        .json({ code: 0, msg: "You cannot follow yourself" });
    }

    const user = await User.findById(id);
    const follower = await User.findById(followerId);

    console.log(followerId);
    if (!user || !follower) {
      return res.status(404).json({ code: 0, msg: " User not found" });
    }

    if (user.followers.includes(followerId)) {
      return res
        .status(400)
        .json({ code: 0, msg: "Already following this user" });
    }

    user.followers.push(followerId);
    follower.following.push(id);

    await user.save();
    await follower.save();

    return res.status(200).json({ code: 1, msg: "User followed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};

export const unfollowUser = async (req, res) => {
  const unfollowerId = req.user._id;
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ code: 0, msg: "User ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ code: 0, msg: "Invalid user ID format" });
    }

    if (unfollowerId === id) {
      return res
        .status(400)
        .json({ code: 0, msg: "You cannot unfollow yourself" });
    }

    const user = await User.findById(id);
    const unfollower = await User.findById(unfollowerId);

    if (!user || !unfollower) {
      return res.status(404).json({ code: 0, msg: "User not found" });
    }

    if (!user.followers.includes(unfollowerId)) {
      return res.status(400).json({
        code: 0,
        msg: "You cannot unfollow because you do not follow this user",
      });
    }

    user.followers.pull(unfollowerId);
    unfollower.following.pull(id);

    await user.save();
    await unfollower.save();

    return res
      .status(200)
      .json({ code: 1, msg: "User unfollowed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};

export const searchUser = async (req, res) => {
  const { name } = req.query;
  if (!name || name.trim() === "") {
    return res.status(400).json({ code: 0, msg: "Search term is required" });
  }

  try {
    const users = await User.find({
      username: { $regex: name, $options: "i" },
    }).select("username profilePicture");
    if (users.length === 0) {
      return res.status(404).json({ code: 0, msg: "No users found" });
    }

    return res.status(200).json({
      code: 1,
      msg: "Users found",
      users,
    });
  } catch (error) {
    console.log("Error in searchUser controller:", error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};

export const getFollowingList = async (req, res) => {
  const userId = req.user._id; 
  try {
   
    const user = await User.findById(userId).populate("following", "username profilePicture"); 
    
    if (!user) {
      return res.status(404).json({ code: 0, msg: "User not found" });
    }

    return res.status(200).json({
      code: 1,
      msg: "Following list fetched successfully",
      following: user.following, 
    });
  } catch (error) {
    console.error("Error fetching following list:", error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};
export const getFollowerList = async (req, res) => {
  const userId = req.user._id; 
  try {
   
    const user = await User.findById(userId).populate("followers", "username profilePicture"); 
    
    if (!user) {
      return res.status(404).json({ code: 0, msg: "User not found" });
    }

    return res.status(200).json({
      code: 1,
      msg: "Following list fetched successfully",
      followers: user.followers, 
    });
  } catch (error) {
    console.error("Error fetching following list:", error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users and select only the fields you need
    const users = await User.find().select("username profilePicture"); 

    if (users.length === 0) {
      return res.status(404).json({ code: 0, msg: "No users found" });
    }

    return res.status(200).json({
      code: 1,
      msg: "Users fetched successfully",
      users, // Return the array of users
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};