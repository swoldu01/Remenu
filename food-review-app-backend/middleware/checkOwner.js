const Restaurant = require('../models/restaurant');
const Dish = require('../models/dish');

const checkOwner = async (req, res, next) => {
  const userId = req.userData._id; // Set by isAuthenticated middleware
  const restaurantId = req.params.restaurantId || req.body.restaurant;
  const dishId = req.params.dishId;

  try {
    if (restaurantId) {
      // Check if the user is the owner of the restaurant
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
      if (!restaurant.owner.equals(userId) && req.userData.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Not the owner of the restaurant.' });
      }
    } else if (dishId) {
      // Check if the user is the owner of the dish's restaurant
      const dish = await Dish.findById(dishId).populate('restaurant');
      if (!dish) {
        return res.status(404).json({ message: 'Dish not found' });
      }
      if (!dish.restaurant.owner.equals(userId) && req.userData.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Not the owner of the related restaurant.' });
      }
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = checkOwner;
