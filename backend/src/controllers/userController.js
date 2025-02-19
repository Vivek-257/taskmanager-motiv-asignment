import User from '../models/User.js';
import createError from '../utils/createError.js'; 


export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, 'name _id');
    res.status(200).json(users);
  } catch (error) {
    next(createError({ status: 500, message: 'Error fetching users' }));
  }
};


export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); 

    if (!user) {
      return next(createError({ status: 404, message: 'User not found' }));
    }

    res.status(200).json(user);
  } catch (error) {
    next(createError({ status: 500, message: 'Error fetching user' }));
  }
};
