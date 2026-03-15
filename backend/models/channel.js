const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['whatsapp', 'email', 'slack', 'telegram'], required: true },
  value: { type: String, required: true },
  verified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Channel', channelSchema);
