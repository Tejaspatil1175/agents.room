const mongoose = require('mongoose');

const runSchema = new mongoose.Schema({
  agent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  output: { type: String, default: null },
  status: { type: String, enum: ['success', 'fail'], required: true },
  error_message: { type: String, default: null },
  ran_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Run', runSchema);
