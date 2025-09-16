const mongoose = require('mongoose');
const { ALERT_TYPES, ALERT_STATUS } = require('../config/constants');

const alertSchema = new mongoose.Schema({
  touristId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tourist',
    required: true
  },
  type: {
    type: String,
    enum: Object.values(ALERT_TYPES),
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: String
  },
  status: {
    type: String,
    enum: Object.values(ALERT_STATUS),
    default: ALERT_STATUS.ACTIVE
  },
  description: String,
  evidenceLog: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    description: String,
    dataSnapshot: mongoose.Schema.Types.Mixed
  }],
  resolvedAt: Date,
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
});

alertSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Alert', alertSchema);