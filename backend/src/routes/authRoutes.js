import express from 'express';
import { register, login, logout, isLoggedIn } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js'; 
const router = express.Router();

// User registration
router.post('/register', register);

// User login
router.post('/login', login);

// User logout
router.post('/logout', logout);

// Check if user is logged in
router.get('/isLoggedIn', isLoggedIn);

export default router;
