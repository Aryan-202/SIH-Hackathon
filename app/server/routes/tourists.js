const express = require('express');
const router = express.Router();
const {
  register,
  login,
  updateLocation,
  triggerPanic,
  getProfile
} = require('../controllers/touristController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.post('/location', auth, updateLocation);
router.post('/panic', auth, triggerPanic);
router.get('/me', auth, getProfile);

module.exports = router;