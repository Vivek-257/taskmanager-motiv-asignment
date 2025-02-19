import express from 'express';
import { getAllUsers, getUserById } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers); // Get all users
router.get('/:id', getUserById); // Get a specific user by ID

export default router;
