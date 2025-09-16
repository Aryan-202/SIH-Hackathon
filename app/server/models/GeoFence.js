const mongoose = require('mongoose');
const { GEOFENCE_TYPES } = require('../config/constants');

const geofenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: Object.values(GEOFENCE_TYPES),
    required: true
  },
  geometry: {
    type: {
      type: String,
      enum: ['Polygon'],
      required: true
    },
    coordinates: {
      type: [[[Number]]], // Array of arrays of arrays of numbers
      required: true
    }
  },
  description: String,
  radius: Number // For circular geofences
}, {
  timestamps: true
});

geofenceSchema.index({ geometry: '2dsphere' });

module.exports = mongoose.model('GeoFence', geofenceSchema);