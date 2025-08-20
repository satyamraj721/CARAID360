const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// POST /signup - Register a new user
router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email: email.toLowerCase(), password: hashed });
    const token = signToken(user._id);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    next(err);
  }
});

// POST /login - Authenticate user and return JWT
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user._id);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
});

// GET /me - Fetch logged-in user info
router.get('/me', auth, async (req, res, next) => {
  try {
    const me = await User.findById(req.userId).select('-password');
    if (!me) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user: me });
  } catch (err) {
    next(err);
  }
});

// PUT /me - Update logged-in user info
router.put('/me', auth, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const update = {};
    if (name) update.name = name;
    if (email) update.email = email.toLowerCase();
    if (password) {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(password, salt);
    }

    if (update.email) {
      const existing = await User.findOne({ email: update.email, _id: { $ne: req.userId } });
      if (existing) {
        return res.status(409).json({ message: 'Email already in use' });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: update },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

