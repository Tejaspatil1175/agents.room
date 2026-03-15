const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplace');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, marketplaceController.getMarketplace);
router.post('/publish/:id', authMiddleware, marketplaceController.publishAgent);
router.post('/install/:id', authMiddleware, marketplaceController.installAgent);

module.exports = router;
