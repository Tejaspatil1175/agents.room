const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password_hash: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  timezone: { type: String, default: 'UTC' },
  groq_api_key: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
