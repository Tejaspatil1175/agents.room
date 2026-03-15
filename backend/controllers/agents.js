const Agent = require('../models/agent');
const { startAgentJob, pauseAgentJob, resumeAgentJob, deleteAgentJob } = require('../services/scheduler');
const { runAgent } = require('../services/runner');

exports.getAgents = async (req, res, next) => {
  try {
    const agents = await Agent.find({ user_id: req.user._id });
    res.json({ success: true, data: agents });
  } catch (err) {
    next(err);
  }
};

exports.createAgent = async (req, res, next) => {
  try {
    const { name, type, config, schedule_cron, channel } = req.body;
    if (!name || !type || !config || !schedule_cron || !channel) {
      return res.status(400).json({ success: false, message: 'name, type, config, schedule_cron, channel are required' });
    }

    const validTypes = ['weather', 'news', 'research', 'content'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ success: false, message: 'Invalid agent type' });
    }

    const agent = await Agent.create({ user_id: req.user._id, name, type, config, schedule_cron, channel });
    startAgentJob(agent._id.toString(), schedule_cron);
    res.status(201).json({ success: true, data: agent });
  } catch (err) {
    next(err);
  }
};

exports.getAgent = async (req, res, next) => {
  try {
    const agent = await Agent.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!agent) return res.status(404).json({ success: false, message: 'Agent not found' });
    res.json({ success: true, data: agent });
  } catch (err) {
    next(err);
  }
};

exports.updateAgent = async (req, res, next) => {
  try {
    const agent = await Agent.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!agent) return res.status(404).json({ success: false, message: 'Agent not found' });

    const { name, type, config, schedule_cron, channel } = req.body;
    if (name) agent.name = name;
    if (type) agent.type = type;
    if (config) agent.config = config;
    if (channel) agent.channel = channel;
    if (schedule_cron) {
      agent.schedule_cron = schedule_cron;
      deleteAgentJob(agent._id.toString());
      if (agent.status === 'active') {
        startAgentJob(agent._id.toString(), schedule_cron);
      }
    }

    await agent.save();
    res.json({ success: true, data: agent });
  } catch (err) {
    next(err);
  }
};

exports.deleteAgent = async (req, res, next) => {
  try {
    const agent = await Agent.findOneAndDelete({ _id: req.params.id, user_id: req.user._id });
    if (!agent) return res.status(404).json({ success: false, message: 'Agent not found' });
    deleteAgentJob(agent._id.toString());
    res.json({ success: true, data: { message: 'Agent deleted' } });
  } catch (err) {
    next(err);
  }
};

exports.pauseAgent = async (req, res, next) => {
  try {
    const agent = await Agent.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!agent) return res.status(404).json({ success: false, message: 'Agent not found' });
    agent.status = 'paused';
    await agent.save();
    pauseAgentJob(agent._id.toString());
    res.json({ success: true, data: { message: 'Agent paused' } });
  } catch (err) {
    next(err);
  }
};

exports.resumeAgent = async (req, res, next) => {
  try {
    const agent = await Agent.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!agent) return res.status(404).json({ success: false, message: 'Agent not found' });
    agent.status = 'active';
    await agent.save();
    resumeAgentJob(agent._id.toString(), agent.schedule_cron);
    res.json({ success: true, data: { message: 'Agent resumed' } });
  } catch (err) {
    next(err);
  }
};

exports.runNow = async (req, res, next) => {
  try {
    const agent = await Agent.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!agent) return res.status(404).json({ success: false, message: 'Agent not found' });
    await runAgent(agent._id.toString());
    res.json({ success: true, data: { message: 'Agent triggered successfully' } });
  } catch (err) {
    next(err);
  }
};
