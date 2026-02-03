const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const authController = {
  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Find user and check password in one operation
      const user = await User.findOne({ email });
      
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      
      // Create JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      );
      
      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          email: user.email
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Register user
  signup: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      // Create new user (password will be hashed by pre-save hook)
      const user = await User.create({
        email,
        password
      });
      
      res.status(201).json({
        message: 'User created successfully',
        user: {
          id: user._id,
          email: user.email
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = authController;