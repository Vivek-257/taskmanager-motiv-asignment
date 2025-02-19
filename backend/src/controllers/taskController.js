import Task from '../models/Task.js';
import User from '../models/User.js';
import createError from '../utils/createError.js';

// Create a new task
export const createTask = async (req, res, next) => {
  const { title, description, status, assignedTo } = req.body;

  if (!title || !description || !assignedTo) {
    return next(createError({ status: 400, message: 'Title, description, and assigned user are required' }));
  }

  try {
    const newTask = new Task({
      title,
      description,
      status,
      assignedTo,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};




export const getTasks = async (req, res, next) => {
  try {
    const user = req.user; 
    let tasks;

    if (user.role === 'admin') {
      // Admin can view all tasks and populate the assigned user's name
      tasks = await Task.find().populate('assignedTo', 'name'); 
    } else {
      // Regular user can only see their own tasks, and we populate assigned user's name
      tasks = await Task.find({ assignedTo: user._id }).populate('assignedTo', 'name'); 
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};


// Get a specific task by ID
export const getTaskById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return next(createError({ status: 404, message: 'Task not found' }));
    }

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};



export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, priority, assignedTo } = req.body;

  try {
    let task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.priority = priority || task.priority;
    
    // If assignedTo is provided, update it
    if (assignedTo) {
      task.assignedTo = assignedTo;
    }

    await task.save(); // Save the updated task

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return next(createError({ status: 404, message: 'Task not found' }));
    }

    if (task.assignedTo.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(createError({ status: 403, message: 'You are not authorized to delete this task' }));
    }



    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};



export const getUserTasks = async (req, res, next) => {
  try {
    console.log("Decoded user:", req.user);
    const userId = req.user.id; 
    const tasks = await Task.find({ assignedTo: userId });


    if (!tasks.length) {
      return next(createError({ status: 404, message: "No tasks found for this user" }));
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};



export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const taskId = req.params.id;

    // Check if status is valid
    const validStatuses = ['To-Do', 'In Progress', 'Done'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    task.status = status;
    await task.save();

    res.json({ message: 'Task status updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};