const Run = require('../models/run');
const Agent = require('../models/agent');

exports.getRunsByAgent = async (req, res, next) => {
  try {
    const agent = await Agent.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!agent) return res.status(404).json({ success: false, message: 'Agent not found' });

    const runs = await Run.find({ agent_id: req.params.id }).sort({ ran_at: -1 }).limit(50);
    res.json({ success: true, data: runs });
  } catch (err) {
    next(err);
  }
};

exports.getAllRuns = async (req, res, next) => {
  try {
    // Find all agents belonging to the user
    const agents = await Agent.find({ user_id: req.user._id }).select('_id');
    const agentIds = agents.map(a => a._id);

    // Find runs (messages) for those agents
    const runs = await Run.find({ agent_id: { $in: agentIds } })
      .sort({ ran_at: -1 })
      .limit(50)
      .populate('agent_id', 'name type');

    res.json({ success: true, data: runs });
  } catch (err) {
    next(err);
  }
};

exports.getRun = async (req, res, next) => {
  try {
    const run = await Run.findById(req.params.runId).populate('agent_id');
    if (!run) return res.status(404).json({ success: false, message: 'Run not found' });

    if (run.agent_id.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    res.json({ success: true, data: run });
  } catch (err) {
    next(err);
  }
};
