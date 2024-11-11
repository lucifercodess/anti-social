import express from "express";
import { createPost, deletePost, editPost, getPostById, likeUnlikePost, listPostsByUser, tagUser } from "../controllers/post.controller.js";
import { protectedRoute } from "../middlewares/protectRoute.js";
import upload from "../middlewares/upload.js";

const router = express.Router();


router.post('/create',protectedRoute,upload.single("image"),createPost);
router.put('/update/:id',protectedRoute,editPost);
router.delete('/delete/:id',protectedRoute,deletePost);
router.get('/get/:id',protectedRoute,getPostById);
router.post('/likeUnlike/:id',protectedRoute,likeUnlikePost);
router.get('/postByUser/:id',protectedRoute,listPostsByUser);
router.get('/tag/:id',protectedRoute,tagUser);

export default router;