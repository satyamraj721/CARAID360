const User = require('../models/User');

exports.getMe = async (req, res, next) => {
  try {
    const me = await User.findById(req.userId).select('-passwordHash');
    if (!me) return res.status(404).json({ message: 'User not found' });
    res.json({ user: me });
  } catch (e) { next(e); }
}

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
    res.json({ users });
  } catch (e) { next(e); }
}

