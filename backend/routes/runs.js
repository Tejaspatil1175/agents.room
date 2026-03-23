const express = require('express');
const router = express.Router();
const runsController = require('../controllers/runs');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', runsController.getAllRuns);
router.get('/agent/:id', runsController.getRunsByAgent);
router.get('/:runId', runsController.getRun);

module.exports = router;
