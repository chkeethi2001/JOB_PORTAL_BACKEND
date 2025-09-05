// backend/routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, getProfile, logoutUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import { registerSchema, loginSchema } from '../utils/validationSchema.js';
import multer from 'multer';
const router = express.Router();

// Register route with validation
router.post('/register', validateRequest(registerSchema), registerUser);

// Login route with validation
router.post('/login', validateRequest(loginSchema), loginUser);

// Protected profile route
router.get('/profile', protect, getProfile);

// Logout route (optional)
router.post('/logout', protect, logoutUser);

export default router;
