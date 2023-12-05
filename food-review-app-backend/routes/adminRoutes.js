// adminRoutes.js
const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const isAuthenticated = require('../middleware/isAuthenticated');
const checkRole = require('../middleware/checkRole');
const checkOwner = require('../middleware/checkOwner');

// User Management
router.get('/users', isAuthenticated, checkRole('admin'), AdminController.listAllUsers);
router.put('/users/:userId/role', isAuthenticated, checkRole('admin'), AdminController.updateUserRole);
router.delete('/users/:userId', isAuthenticated, checkRole('admin'), AdminController.deleteUser);

// Restaurant Management
router.get('/restaurants', isAuthenticated, checkRole('admin'), AdminController.listAllRestaurants);
router.post('/restaurants', isAuthenticated, checkRole('admin'), AdminController.createRestaurant);
router.put('/restaurants/:restaurantId', isAuthenticated, checkRole('admin'), checkOwner, AdminController.updateRestaurant);
router.delete('/restaurants/:restaurantId', isAuthenticated, checkRole('admin'), AdminController.deleteRestaurant);

// Dish Management
router.get('/dishes', isAuthenticated, checkRole('admin'), AdminController.listAllDishes);
router.post('/restaurants/:restaurantId/dishes', isAuthenticated, checkRole('admin', 'owner'), checkOwner, AdminController.addDish);
router.put('/dishes/:dishId', isAuthenticated, checkRole('admin'), checkOwner, AdminController.updateDish);
router.delete('/dishes/:dishId', isAuthenticated, checkRole('admin'), AdminController.deleteDish);

// Review Management
router.get('/reviews', isAuthenticated, checkRole('admin'), AdminController.listAllReviews);
router.delete('/reviews/:reviewId', isAuthenticated, checkRole('admin'), AdminController.deleteReview);


module.exports = router;
