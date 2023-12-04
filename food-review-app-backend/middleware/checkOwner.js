const User = require('../models/user');

const checkOwner = async (req, res, next) => {
  const userId = req.userData._id;
  const restaurantId = req.params.restaurantId;

  try {
    const user = await User.findById(userId);
    if (!user || !user.restaurantIds.includes(restaurantId)) {
      return res.status(403).json({ message: 'Access denied for Owner' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = checkOwner;
