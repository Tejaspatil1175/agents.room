const express = require('express');
const router = express.Router();
const agentsController = require('../controllers/agents');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', agentsController.getAgents);
router.post('/', agentsController.createAgent);
router.get('/:id', agentsController.getAgent);
router.put('/:id', agentsController.updateAgent);
router.delete('/:id', agentsController.deleteAgent);
router.post('/:id/pause', agentsController.pauseAgent);
router.post('/:id/resume', agentsController.resumeAgent);
router.post('/:id/run-now', agentsController.runNow);

module.exports = router;
