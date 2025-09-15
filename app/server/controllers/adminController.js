const Tourist = require('../models/Tourist');
const Alert = require('../models/Alert');
const EFIR = require('../models/EFIR');
const jwt = require('jsonwebtoken');
const efirService = require('../services/efirService');

// Admin login (hardcoded for demo)
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hardcoded admin credentials for demo
    if (username === 'admin' && password === 'admin123') {
      const token = jwt.sign(
        { username: 'admin' },
        process.env.JWT_ADMIN_SECRET,
        { expiresIn: '8h' }
      );

      res.json({
        success: true,
        token,
        admin: { username: 'admin' }
      });
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalTourists = await Tourist.countDocuments();
    const activeAlerts = await Alert.countDocuments({ status: 'active' });
    const totalAlerts = await Alert.countDocuments();
    const resolvedAlerts = await Alert.countDocuments({ status: 'resolved' });

    res.json({
      success: true,
      stats: {
        totalTourists,
        activeAlerts,
        totalAlerts,
        resolvedAlerts
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tourists
const getAllTourists = async (req, res) => {
  try {
    const tourists = await Tourist.find().select('-password');
    res.json({ success: true, tourists });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all alerts
const getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find()
      .populate('touristId', 'fullName phoneNumber email')
      .sort({ createdAt: -1 });

    res.json({ success: true, alerts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update alert status
const updateAlertStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { alertId } = req.params;

    const alert = await Alert.findByIdAndUpdate(
      alertId,
      { status },
      { new: true }
    ).populate('touristId', 'fullName phoneNumber');

    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    res.json({ success: true, alert });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate e-FIR
const generateEFIR = async (req, res) => {
  try {
    const { alertId } = req.params;
    
    const alert = await Alert.findById(alertId).populate('touristId');
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    const efir = await efirService.generateEFIR(alert, req.admin.username);
    
    res.json({
      success: true,
      efir,
      message: 'E-FIR generated successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  getDashboardStats,
  getAllTourists,
  getAllAlerts,
  updateAlertStatus,
  generateEFIR
};