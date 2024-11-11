import { client } from "../index.js";
import Post from "../models/post.model.js";
import cloudinary from "cloudinary";
export const createPost = async (req, res) => {
  const { content } = req.body;
  const image = req.file;
  try {
    if (!image) {
      return res.status(400).json({ code: 0, msg: "Image is required" });
    }
    let imageUrl = null;
    if (image) {
      const allowedTypes = ["image/jpg", "image/png", "image/gif"];
      if (!allowedTypes.includes(image.mimetype)) {
        return res.status(400).json({ code: 0, msg: "Invalid image format" });
      }

      const result = await cloudinary.uploader.upload(image.path, {
        folder: "post_images",
      });
      imageUrl = result.secure_url;
    }
    const post = new Post({
      userId: req.user._id,
      content,
      image: imageUrl,
    });
    const savedPost = await post.save();
    res
      .status(201)
      .json({ code: 1, msg: "Post created successfully", post: savedPost });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};

// edit post where user can only edit the content

export const editPost = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    if (!content) {
      return res.status(400).json({ code: 0, msg: "Content is required" });
    }
    const post = await Post.findByIdAndUpdate(id, { content }, { new: true });
    if (!post) {
      return res.status(404).json({ code: 0, msg: "Post not found" });
    }
    if (post.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ code: 0, msg: "You can only edit your own posts" });
    }
    post.updatedAt = new Date();
    await post.save();
    res.status(200).json({ code: 1, msg: "Post updated successfully", post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ code: 0, msg: "Post not found" });
    }
    res.status(200).json({ code: 1, msg: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ code: 0, msg: "Post not found" });
    }
    return res
      .status(200)
      .json({ code: 1, msg: "Post fetched successfully", post: post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};

export const listPostsByUser = async (req, res) => {
  const id = req.user._id;
  const cacheKey = `posts:${userId}`;
  try {
    const cachedPosts = await client.get(cacheKey);

    if (cachedPosts) {
      return res.status(200).json({
        code: 1,
        msg: "Posts fetched from cache",
        posts: JSON.parse(cachedPosts),
      });
    }
    const posts = await Post.find({ userId: id }).sort({ createdAt: -1 });
    if (posts.length === 0) {
      return res
        .status(404)
        .json({ code: 0, msg: "No posts found for this user" });
    }
    await client.setEx(cacheKey, 3600, JSON.stringify(posts));
    return res
      .status(200)
      .json({ code: 1, msg: "Posts fetched successfully", posts: posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};

export const likeUnlikePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ code: 0, msg: "Post not found" });
    }

    const update = post.likes.includes(userId)
      ? { $pull: { likes: userId } }
      : { $push: { likes: userId } };

    await Post.findByIdAndUpdate(id, update, { new: true });
    return res
      .status(200)
      .json({ code: 1, msg: "Post liked/unliked successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};

export const tagUser = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ code: 0, msg: "Post not found" });
    }
    if (post.userId !== userId) {
      return res
        .status(403)
        .json({ code: 0, msg: "you can tag only on your posts" });
    }
    const { tagId } = req.body;
    if (!tagId) {
      return res.status(400).json({ code: 0, msg: "Tag id is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(tagId)) {
      return res.status(400).json({ code: 0, msg: "Invalid tag id format" });
    }
    if (post.tags.includes(tagId)) {
      return res
        .status(400)
        .json({ code: 0, msg: "Tag already added to this post" });
    }

    const tag = await Tag.findById(tagId);
    if (!tag) {
      return res.status(404).json({ code: 0, msg: "Tag not found" });
    }
    post.tags.push(tagId);
    await post.save();
    return res
      .status(200)
      .json({ code: 1, msg: "Tag added successfully", post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};
