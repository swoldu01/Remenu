const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const checkRole = require('../middleware/checkRole');
const RestaurantController = require('../controllers/restaurantController');

// Route for owners to manage their restaurants
router.put('/restaurant/:id', isAuthenticated, checkRole(['owner', 'admin']), RestaurantController.update);

// Admin-only route
router.post('/restaurant', isAuthenticated, checkRole(['admin']), RestaurantController.create);



module.exports = router;
