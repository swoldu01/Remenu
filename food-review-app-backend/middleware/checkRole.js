const checkRole = (roles) => (req, res, next) => {
    if (!req.userData || !roles.includes(req.userData.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
  
  module.exports = checkRole;
  