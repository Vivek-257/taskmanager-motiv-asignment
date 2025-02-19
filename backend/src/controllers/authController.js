import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import createError from '../utils/createError.js';

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(createError({ status: 400, message: 'Name, email, and password are required' }));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError({ status: 400, message: 'User already exists' }));
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json('User created successfully');
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createError({ status: 400, message: 'Email and password are required' }));
  }

  try {
    const user = await User.findOne({ email }).select('name email password role');
    if (!user) {
      return next(createError({ status: 404, message: 'User not found' }));
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError({ status: 400, message: 'Incorrect password' }));
    }

    const payload = {
      id: user._id,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ message: 'Login success', token, user:{
        name:user.name,
        email:user.email,
        role:user.role

      } });
  } catch (error) {
    console.log(error);
    return res.status(500).json('Server error');
  }
};



export const logout = (req, res) => {
  res.clearCookie('access_token');
  return res.status(200).json({ message: 'Logout success' });
};

export const isLoggedIn = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.json(false);
  }

  return jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.json(false);
    }
    return res.json(true);
  });
};
