const Channel = require('../models/channel');
const { sendMessage } = require('../services/delivery');

async function upsertChannel(userId, type, value) {
  const channel = await Channel.findOneAndUpdate(
    { user_id: userId, type },
    { value, verified: true },
    { upsert: true, new: true }
  );
  
  // Send welcome message to verify connection
  try {
    await sendMessage(type, value, `Welcome to AgentFlow! Your ${type} channel is now successfully connected.`);
  } catch (err) {
    console.error(`Failed to send welcome message to ${type}:`, err.message);
    // Don't fail the request, just log it. The channel was still saved.
  }
  
  return channel;
}

exports.connectWhatsapp = async (req, res, next) => {
  try {
    let { phone } = req.body;
    if (!phone) return res.status(400).json({ success: false, message: 'phone is required' });
    
    // Clean spaces/dashes
    phone = phone.replace(/[\s-]/g, '');
    
    // Auto-fix 10-digit numbers to Indian region (+91)
    if (phone.length === 10 && /^\d+$/.test(phone)) {
      phone = '+91' + phone;
    }
    
    // Ensure phone starts with +
    if (!phone.startsWith('+')) phone = '+' + phone;
    
    console.log(`[WhatsApp] Connecting number: ${phone}`);
    const channel = await upsertChannel(req.user._id, 'whatsapp', phone);
    res.json({ success: true, data: channel });
  } catch (err) { next(err); }
};

exports.connectEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'email is required' });
    const channel = await upsertChannel(req.user._id, 'email', email);
    res.json({ success: true, data: channel });
  } catch (err) { next(err); }
};

exports.connectSlack = async (req, res, next) => {
  try {
    const { webhook_url } = req.body;
    if (!webhook_url) return res.status(400).json({ success: false, message: 'webhook_url is required' });
    const channel = await upsertChannel(req.user._id, 'slack', webhook_url);
    res.json({ success: true, data: channel });
  } catch (err) { next(err); }
};

exports.connectTelegram = async (req, res, next) => {
  try {
    const { chat_id } = req.body;
    if (!chat_id) return res.status(400).json({ success: false, message: 'chat_id is required' });
    const channel = await upsertChannel(req.user._id, 'telegram', chat_id);
    res.json({ success: true, data: channel });
  } catch (err) { next(err); }
};

exports.testChannel = async (req, res, next) => {
  try {
    const { type } = req.params;
    const channel = await Channel.findOne({ user_id: req.user._id, type });
    if (!channel) {
      return res.status(404).json({ success: false, message: `${type} channel not connected` });
    }
    
    console.log(`[TEST] Attempting to send message to ${type} (${channel.value})`);
    await sendMessage(type, channel.value, `Connectivity Test: Your ${type} channel is working correctly!`);
    console.log(`[TEST] Successfully called sendMessage for ${type}`);
    res.json({ success: true, message: `Test message sent to ${type}` });
  } catch (err) {
    console.error(`[TEST ERROR] Failed to send message to ${type}:`, err.message);
    next(err);
  }
};

exports.deleteChannel = async (req, res, next) => {
  try {
    const { type } = req.params;
    const validTypes = ['whatsapp', 'email', 'slack', 'telegram'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ success: false, message: 'Invalid channel type' });
    }
    await Channel.findOneAndDelete({ user_id: req.user._id, type });
    res.json({ success: true, data: { message: `${type} channel removed` } });
  } catch (err) { next(err); }
};
