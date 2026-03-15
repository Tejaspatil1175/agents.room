const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

exports.register = async (req, res, next) => {
  try {
    const { email, password, name, timezone } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: 'email, password, and name are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const password_hash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password_hash, name, timezone: timezone || 'UTC' });

    const token = generateToken(user._id);
    res.status(201).json({ success: true, data: { token, user: { id: user._id, email: user.email, name: user.name } } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.json({ success: true, data: { token, user: { id: user._id, email: user.email, name: user.name } } });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    res.json({ success: true, data: req.user });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.json({ success: true, data: { message: 'Logged out successfully' } });
  } catch (err) {
    next(err);
  }
};

exports.saveGroqKey = async (req, res, next) => {
  try {
    const { groq_api_key } = req.body;
    if (!groq_api_key) {
      return res.status(400).json({ success: false, message: 'groq_api_key is required' });
    }

    await User.findByIdAndUpdate(req.user._id, { groq_api_key });
    res.json({ success: true, data: { message: 'Groq API key saved' } });
  } catch (err) {
    next(err);
  }
};

exports.deleteGroqKey = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { groq_api_key: null });
    res.json({ success: true, data: { message: 'Groq API key removed, using system key' } });
  } catch (err) {
    next(err);
  }
};
