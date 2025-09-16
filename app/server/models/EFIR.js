const mongoose = require('mongoose');

const efirSchema = new mongoose.Schema({
  alertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alert',
    required: true
  },
  firNumber: {
    type: String,
    required: true,
    unique: true
  },
  touristDetails: mongoose.Schema.Types.Mixed,
  incidentDetails: mongoose.Schema.Types.Mixed,
  generatedBy: {
    type: String,
    required: true
  },
  blockchainTransactionHash: {
    type: String,
    default: '0x' + Math.random().toString(16).substr(2, 64) // Mock hash for demo
  },
  pdfPath: String
}, {
  timestamps: true
});

module.exports = mongoose.model('EFIR', efirSchema);