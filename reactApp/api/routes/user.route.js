import express from 'express';
import { followUser, getProfileBYId, unfollowUser, updateUserProfile,updatePassword, searchUser, getFollowerList, getFollowingList, getAllUsers} from '../controllers/user.controller.js';
import { protectedRoute } from '../middlewares/protectRoute.js';

const router = express.Router();

router.get('/get/:id',protectedRoute,getProfileBYId)
router.post('/follow/:id',protectedRoute,followUser)
router.post('/unfollow/:id',protectedRoute,unfollowUser)
router.put('/update',protectedRoute,updateUserProfile)
router.put('/update-password', protectedRoute, updatePassword)
router.get('/search', searchUser);
router.get('/followers',protectedRoute,getFollowerList)
router.get('/following',protectedRoute,getFollowingList)
router.get('/all',protectedRoute,getAllUsers);
export default router;