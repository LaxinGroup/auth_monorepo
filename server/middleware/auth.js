const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get token from Authorization header (Format: Bearer <token>)
  const authHeader = req.headers.authorization;
  
  // This line was missing and caused the error:
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token using secret from your .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach userId to request object (used in your /api/me route)
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};


