const Tourist = require('../models/Tourist');
const Alert = require('../models/Alert');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ALERT_TYPES } = require('../config/constants');
const locationService = require('../services/locationService');
const aiService = require('../services/aiService');

// Generate mock blockchain hash for demo
const generateMockBlockchainHash = () => {
  return '0x' + Math.random().toString(16).substr(2, 64);
};

// Register tourist
const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, nationality, emergencyContacts, password } = req.body;

    // Check if tourist exists
    let tourist = await Tourist.findOne({ email });
    if (tourist) {
      return res.status(400).json({ message: 'Tourist already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create tourist
    tourist = new Tourist({
      fullName,
      email,
      phoneNumber,
      nationality,
      emergencyContacts,
      password: hashedPassword,
      digitalIdHash: generateMockBlockchainHash()
    });

    await tourist.save();

    // Create token
    const token = jwt.sign(
      { id: tourist._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      token,
      tourist: {
        id: tourist._id,
        fullName: tourist.fullName,
        email: tourist.email,
        digitalIdHash: tourist.digitalIdHash
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login tourist
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if tourist exists
    const tourist = await Tourist.findOne({ email });
    if (!tourist) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, tourist.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: tourist._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      token,
      tourist: {
        id: tourist._id,
        fullName: tourist.fullName,
        email: tourist.email,
        digitalIdHash: tourist.digitalIdHash
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update location
const updateLocation = async (req, res) => {
  try {
    const { coordinates, address } = req.body;
    
    // Update tourist's location
    req.tourist.lastKnownLocation = {
      type: 'Point',
      coordinates: [coordinates.longitude, coordinates.latitude],
      timestamp: new Date()
    };
    
    await req.tourist.save();

    // Check for geofence breaches and anomalies
    await locationService.checkGeofences(req.tourist);
    await aiService.checkAnomalies(req.tourist);

    res.json({ success: true, message: 'Location updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Trigger panic button
const triggerPanic = async (req, res) => {
  try {
    const alert = new Alert({
      touristId: req.tourist._id,
      type: ALERT_TYPES.PANIC,
      location: req.tourist.lastKnownLocation,
      description: 'Panic button activated by tourist'
    });

    await alert.save();

    // Emit real-time alert via Socket.io
    req.app.get('io').emit('new-alert', {
      ...alert.toObject(),
      tourist: {
        fullName: req.tourist.fullName,
        phoneNumber: req.tourist.phoneNumber
      }
    });

    res.json({ success: true, alert });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tourist profile
const getProfile = async (req, res) => {
  try {
    res.json({
      success: true,
      tourist: {
        id: req.tourist._id,
        fullName: req.tourist.fullName,
        email: req.tourist.email,
        phoneNumber: req.tourist.phoneNumber,
        digitalIdHash: req.tourist.digitalIdHash,
        lastKnownLocation: req.tourist.lastKnownLocation,
        emergencyContacts: req.tourist.emergencyContacts
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  updateLocation,
  triggerPanic,
  getProfile
};