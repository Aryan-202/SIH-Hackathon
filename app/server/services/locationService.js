const GeoFence = require('../models/GeoFence');
const Alert = require('../models/Alert');
const { ALERT_TYPES } = require('../config/constants');

const checkGeofences = async (tourist) => {
  try {
    const location = tourist.lastKnownLocation;
    
    if (!location || !location.coordinates) return;

    // Find geofences that contain the tourist's location
    const breachedGeofences = await GeoFence.find({
      geometry: {
        $geoIntersects: {
          $geometry: {
            type: 'Point',
            coordinates: location.coordinates
          }
        }
      },
      type: { $in: ['restricted', 'high-risk'] }
    });

    if (breachedGeofences.length > 0) {
      const geofence = breachedGeofences[0];
      
      const alert = new Alert({
        touristId: tourist._id,
        type: ALERT_TYPES.GEOFENCE,
        location: tourist.lastKnownLocation,
        description: `Entered ${geofence.type} zone: ${geofence.name}`
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
  } catch (error) {
    console.error('Geofence check error:', error);
  }
};

module.exports = {
  checkGeofences
};