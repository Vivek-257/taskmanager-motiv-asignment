import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getUserTasks,
  updateTaskStatus,
} from '../controllers/taskController.js';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js'; // We'll create these middlewares shortly
const router = express.Router();

// Create a new task (Only accessible to logged-in users)
router.post('/', verifyToken, verifyAdmin, createTask);

// Get all tasks (Admins can see all tasks, users can see only their own tasks)
router.get('/', verifyToken,verifyAdmin, getTasks);



// Update task by ID
router.put('/:id', verifyToken, updateTask);

// Delete task by ID
router.delete('/:id', verifyToken, deleteTask);


//logged in user task

router.get('/user', verifyToken, getUserTasks);



// Update task status (Only the assigned user can update their own task)
router.put('/:id/status', verifyToken, updateTaskStatus);



export default router;
