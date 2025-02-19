import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';

// Middleware to verify the JWT token and authenticate the user
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError({ status: 401, message: 'You are not authenticated' }));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(createError({ status: 403, message: 'Token is not valid' }));
    }
    req.user = user; // Add user details to the request object
    next();
  });
};

// Middleware to check if the user is an admin
export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(createError({ status: 403, message: 'You are not authorized' }));
  }
  next();
};
