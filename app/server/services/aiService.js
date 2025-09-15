const Alert = require('../models/Alert');
const { ALERT_TYPES } = require('../config/constants');

// Simple rule-based anomaly detection for demo
const checkAnomalies = async (tourist) => {
  try {
    const location = tourist.lastKnownLocation;
    if (!location || !location.timestamp) return;

    // Rule 1: Sudden stop (no movement for 30 minutes)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    if (location.timestamp < thirtyMinutesAgo) {
      const alert = new Alert({
        touristId: tourist._id,
        type: ALERT_TYPES.ANOMALY,
        location: tourist.lastKnownLocation,
        description: 'No movement detected for 30 minutes - possible distress situation'
      });

      await alert.save();

      // Emit real-time alert
      const io = require('../server').io;
      if (io) {
        io.emit('new-alert', {
          ...alert.toObject(),
          tourist: {
            fullName: tourist.fullName,
            phoneNumber: tourist.phoneNumber
          }
        });
      }
    }

    // Additional rules can be added here:
    // - Speed anomalies
    // - Deviation from planned route
    // - Unusual time of movement

  } catch (error) {
    console.error('AI anomaly check error:', error);
  }
};

module.exports = {
  checkAnomalies
};