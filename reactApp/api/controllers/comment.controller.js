import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const addComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { text } = req.body;

  try {
    if (!text || text.trim() === "") {
      return res.status(400).json({ code: 0, msg: "Comment text is required" });
    }
    if (text.length > 200) {
      return res
        .status(400)
        .json({ code: 0, msg: "Comment text exceeds 200 characters" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ code: 0, msg: "Post not found" });
    }

    const newComment = { userId, text };
    post.comments.push(newComment);
    await post.save();

    return res.status(200).json({
      code: 1,
      msg: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
};

export const editComment = async (req, res) => {
  const {id,commentId} = req.params;
  const userId = req.user._id;
  const { text } = req.body;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ code: 0, msg: "Post not found" });
    }
    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ code: 0, msg: "Comment not found" });
    }
    if (comment.userId.toString() !== userId.toString()) {
      return res.status(403).json({ code: 0, msg: "You can only edit your own comments" });
    }
    if (!text || text.trim() === "") {
      return res.status(400).json({ code: 0, msg: "Comment text is required" });
    }
    comment.text = text;
    await post.save();
    return res.status(200).json({
      code: 1,
      msg: "Comment edited successfully",
      comment: comment
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
}

export const deleteComment = async (req, res) => {
  const {id,commentId} = req.params;
  const userId = req.user._id;
  try {
    const post = await Post.findById(id);
    if(!post){
      return res.status(404).json({ code: 0, msg: "Post not found" });
    }
    const comment = post.comments.id(commentId);
    if(!comment){
      return res.status(404).json({ code: 0, msg: "Comment not found" });
    }
    if(comment.userId.toString()!== userId.toString()){
      return res.status(403).json({ code: 0, msg: "You can only delete your own comments" });
    }
    post.comments.pull(commentId);
    await post.save();
    return res.status(200).json({ code: 1, msg: "Comment deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
}

export const getCommentsOnaPost = async (req, res) => {
  const {id} = req.params;
  try {
    const post = await Post.findById(id);
    if(!post){
      return res.status(404).json({ code: 0, msg: "Post not found" });
    }
    let comments = post.comments;
    return res.status(200).json({ code: 1, msg: "Comments retrieved successfully", comment : comments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 0, msg: "Server Error" });
  }
}