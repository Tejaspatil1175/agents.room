const Agent = require('../models/agent');
const User = require('../models/user');
const Run = require('../models/run');
const Channel = require('../models/channel');
const { runWeatherAgent } = require('./agents/weather');
const { runNewsAgent } = require('./agents/news');
const { runResearchAgent } = require('./agents/research');
const { runContentAgent } = require('./agents/content');
const { sendMessage } = require('./delivery');

async function runAgent(agentId) {
  let agent;
  try {
    agent = await Agent.findById(agentId);
    if (!agent) throw new Error('Agent not found: ' + agentId);

    const user = await User.findById(agent.user_id);
    if (!user) throw new Error('User not found for agent: ' + agentId);

    let output;
    if (agent.type === 'weather') output = await runWeatherAgent(agent.config, user);
    else if (agent.type === 'news') output = await runNewsAgent(agent.config, user);
    else if (agent.type === 'research') output = await runResearchAgent(agent.config, user);
    else if (agent.type === 'content') output = await runContentAgent(agent.config, user);
    else throw new Error('Unknown agent type: ' + agent.type);

    const channel = await Channel.findOne({ user_id: agent.user_id, type: agent.channel });
    if (!channel) throw new Error('No channel configured for type: ' + agent.channel);

    await sendMessage(channel.type, channel.value, output);

    await Run.create({ agent_id: agentId, output, status: 'success' });
  } catch (err) {
    console.error(`[runner] Agent ${agentId} failed:`, err.message);
    if (agent) {
      await Run.create({ agent_id: agentId, output: null, status: 'fail', error_message: err.message });
    }
  }
}

module.exports = { runAgent };
