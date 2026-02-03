const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: 'Account already exists'
      });
    }

    // The User model has a pre-save hook that hashes the password.
    // Double hashing causes login failures, so we pass the plain password here.
    await User.create({
      email,
      password
    });

    res.status(201).json({ message: 'Signup successful' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/fast-login', (req, res) => {
  console.log('Fast login called');
  res.json({ message: 'Fast login works' });
});

router.get('/ping', (req, res) => {
  const start = Date.now();
  res.json({
    message: 'Server is running',
    time: Date.now() - start + 'ms'
  });
});

router.post('/test-login', async (req, res) => {
  try {
    const start = Date.now();
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();
    console.log('DB query time:', Date.now() - start, 'ms');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Skip bcrypt - just check plain text (TEMPORARY TEST ONLY)
    if (password === 'test123') {
      console.log('Total time:', Date.now() - start, 'ms');
      return res.status(200).json({ message: 'Test login successful' });
    }

    res.status(401).json({ message: 'Wrong password' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const start = Date.now();
    const { email, password } = req.body;

    console.log('Login start:', Date.now() - start, 'ms');
    const user = await User.findOne({ email }).lean();
    console.log('DB query:', Date.now() - start, 'ms');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Bcrypt compare:', Date.now() - start, 'ms');

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('Total login time:', Date.now() - start, 'ms');
    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;