const cron = require('node-cron');
const Agent = require('../models/agent');
const { runAgent } = require('./runner');

const jobMap = new Map();

function startAgentJob(agentId, cronExpression) {
  if (jobMap.has(agentId)) {
    jobMap.get(agentId).destroy();
  }

  if (!cron.validate(cronExpression)) {
    console.warn(`[scheduler] Invalid cron expression for agent ${agentId}: ${cronExpression}`);
    return;
  }

  const job = cron.schedule(cronExpression, () => {
    console.log(`[scheduler] Running agent ${agentId}`);
    runAgent(agentId);
  });

  jobMap.set(agentId, job);
  console.log(`[scheduler] Started job for agent ${agentId} with schedule: ${cronExpression}`);
}

function pauseAgentJob(agentId) {
  const job = jobMap.get(agentId);
  if (job) {
    job.stop();
    console.log(`[scheduler] Paused job for agent ${agentId}`);
  }
}

function resumeAgentJob(agentId, cronExpression) {
  startAgentJob(agentId, cronExpression);
  console.log(`[scheduler] Resumed job for agent ${agentId}`);
}

function deleteAgentJob(agentId) {
  const job = jobMap.get(agentId);
  if (job) {
    job.destroy();
    jobMap.delete(agentId);
    console.log(`[scheduler] Deleted job for agent ${agentId}`);
  }
}

async function reloadAllJobs() {
  console.log('[scheduler] Reloading all active agent jobs...');
  const agents = await Agent.find({ status: 'active' });
  for (const agent of agents) {
    startAgentJob(agent._id.toString(), agent.schedule_cron);
  }
  console.log(`[scheduler] Loaded ${agents.length} active jobs`);
}

module.exports = { startAgentJob, pauseAgentJob, resumeAgentJob, deleteAgentJob, reloadAllJobs };
