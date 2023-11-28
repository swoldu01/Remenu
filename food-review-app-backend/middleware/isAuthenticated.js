const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decodedToken;
    next();
  } catch {
    res.status(401).json({ message: 'Authentication failed!' });
  }
};

module.exports = isAuthenticated;
