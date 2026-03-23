const express = require('express');
const router = express.Router();
const channelsController = require('../controllers/channels');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/connect/whatsapp', channelsController.connectWhatsapp);
router.post('/connect/email', channelsController.connectEmail);
router.post('/connect/slack', channelsController.connectSlack);
router.post('/connect/telegram', channelsController.connectTelegram);
router.get('/test/:type', channelsController.testChannel);
router.delete('/:type', channelsController.deleteChannel);

module.exports = router;
