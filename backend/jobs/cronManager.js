// cronManager.js
// This file is a convenience re-export of scheduler functions.
// The actual job Map and cron logic lives in services/scheduler.js
const { startAgentJob, pauseAgentJob, resumeAgentJob, deleteAgentJob, reloadAllJobs } = require('../services/scheduler');

module.exports = { startAgentJob, pauseAgentJob, resumeAgentJob, deleteAgentJob, reloadAllJobs };
