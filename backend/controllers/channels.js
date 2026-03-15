const Channel = require('../models/channel');

async function upsertChannel(userId, type, value) {
  return Channel.findOneAndUpdate(
    { user_id: userId, type },
    { value, verified: true },
    { upsert: true, new: true }
  );
}

exports.connectWhatsapp = async (req, res, next) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ success: false, message: 'phone is required' });
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
