import express from 'express';
import { getUserProfile, updateUserProfile, toggleWishlist, getUserOrders } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile/:id', getUserProfile);
router.put('/profile/:id', updateUserProfile);
router.post('/wishlist/:id', toggleWishlist);
router.get('/orders/:id', getUserOrders);

export default router;
