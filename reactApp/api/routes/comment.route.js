import express from "express";
import { addComment, deleteComment, editComment, getCommentsOnaPost } from "../controllers/comment.controller.js";
import { protectedRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post('/addComment/:id',protectedRoute,addComment);
router.put('/editComment/:id/:commentId', protectedRoute, editComment);
router.delete('/delete/:id/:commentId', protectedRoute, deleteComment);
router.get('/all/:id',protectedRoute, getCommentsOnaPost);
export default router;