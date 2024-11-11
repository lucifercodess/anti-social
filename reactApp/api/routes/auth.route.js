import express from "express";
import { getUserProfile, login, logout, register } from "../controllers/auth.controller.js";
import upload from "../middlewares/upload.js";
import { protectedRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.get('/profile',protectedRoute,getUserProfile);
router.post('/login',login);
router.post('/register',upload.single('profilePhoto'),register);
router.post('/logout',logout);
export default router;