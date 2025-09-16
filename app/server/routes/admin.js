const express = require('express');
const router = express.Router();
const {
  login,
  getDashboardStats,
  getAllTourists,
  getAllAlerts,
  updateAlertStatus,
  generateEFIR
} = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');

// Public route
router.post('/login', login);

// Protected routes
router.use(adminAuth);
router.get('/dashboard/stats', getDashboardStats);
router.get('/tourists', getAllTourists);
router.get('/alerts', getAllAlerts);
router.patch('/alerts/:alertId/status', updateAlertStatus);
router.post('/generate-efir/:alertId', generateEFIR);

module.exports = router;