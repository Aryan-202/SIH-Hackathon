const QRCode = require('qrcode');
const crypto = require('crypto');

// Generate unique QR code data
const generateQRData = () => {
  const randomToken = crypto.randomBytes(16).toString('hex');
  return `TOURIST:${randomToken}`;
};

// Generate QR code image
const generateQRImage = async (qrData) => {
  try {
    return await QRCode.toDataURL(qrData);
  } catch (err) {
    throw new Error('QR code generation failed');
  }
};

module.exports = {
  generateQRData,
  generateQRImage
};