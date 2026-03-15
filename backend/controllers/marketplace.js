const Agent = require('../models/agent');
const User = require('../models/user');

exports.getMarketplace = async (req, res, next) => {
  try {
    const agents = await Agent.find({ is_public: true })
      .populate('user_id', 'name')
      .select('name type config schedule_cron channel createdAt user_id');
    res.json({ success: true, data: agents });
  } catch (err) {
    next(err);
  }
};

exports.publishAgent = async (req, res, next) => {
  try {
    const agent = await Agent.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!agent) return res.status(404).json({ success: false, message: 'Agent not found' });
    agent.is_public = true;
    await agent.save();
    res.json({ success: true, data: { message: 'Agent published to marketplace' } });
  } catch (err) {
    next(err);
  }
};

exports.installAgent = async (req, res, next) => {
  try {
    const source = await Agent.findOne({ _id: req.params.id, is_public: true });
    if (!source) return res.status(404).json({ success: false, message: 'Public agent not found' });

    const { schedule_cron, channel } = req.body;
    if (!schedule_cron || !channel) {
      return res.status(400).json({ success: false, message: 'schedule_cron and channel are required to install' });
    }

    const newAgent = await Agent.create({
      user_id: req.user._id,
      name: source.name + ' (copy)',
      type: source.type,
      config: source.config,
      schedule_cron,
      channel,
      status: 'active',
      is_public: false
    });

    const { startAgentJob } = require('../services/scheduler');
    startAgentJob(newAgent._id.toString(), schedule_cron);

    res.status(201).json({ success: true, data: newAgent });
  } catch (err) {
    next(err);
  }
};
