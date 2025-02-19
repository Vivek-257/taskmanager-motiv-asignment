
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';  // MongoDB connection
import cookieParser from 'cookie-parser';
import authRoutes from './src/routes/authRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

import { verifyToken } from './src/middleware/authMiddleware.js'; // Middleware for token validation
import cors from 'cors'
import createError from './src/utils/createError.js';

dotenv.config();

const app = express();


const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
};

app.use(cors(corsOptions)); 

//app.use(cors());

app.use(express.json());  
app.use(cookieParser());  // To parse cookies from the request

// Connect to MongoDB
connectDB();

app.use('/api/auth', authRoutes);  // Auth routes for login/register
app.use('/api/tasks', taskRoutes);  // Task routes, only accessible by logged-in users
app.use('/api/users',userRoutes )
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
