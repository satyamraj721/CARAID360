const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signJwt, setAuthCookie } = require('../utils/token');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: 'Email already in use' });
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email: email.toLowerCase(), passwordHash, role: role || 'customer' });
    const token = signJwt(user._id, user.role);
    setAuthCookie(res, token);
    return res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (e) { next(e); }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = signJwt(user._id, user.role);
    setAuthCookie(res, token);
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (e) { next(e); }
}

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('token', { path: '/' });
    return res.json({ success: true });
  } catch (e) { next(e); }
}

