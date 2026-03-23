const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ['weather', 'news', 'research', 'content'], required: true },
  config: { type: mongoose.Schema.Types.Mixed, required: true },
  schedule_cron: { type: String, required: true },
  channel: { type: String, default: null },
  status: { type: String, enum: ['active', 'paused'], default: 'active' },
  is_public: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Agent', agentSchema);
