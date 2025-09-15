const jwt = require('jsonwebtoken');

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    
    // For demo purposes, we'll keep it simple. In production, you'd verify against an Admin model
    if (decoded.username !== 'admin') {
      return res.status(401).json({ message: 'Admin access required.' });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Admin token is not valid.' });
  }
};

module.exports = adminAuth;