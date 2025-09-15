const jwt = require('jsonwebtoken');
const Tourist = require('../models/Tourist');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const tourist = await Tourist.findById(decoded.id).select('-password');
    
    if (!tourist) {
      return res.status(401).json({ message: 'Token is not valid.' });
    }

    req.tourist = tourist;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
};

module.exports = auth;