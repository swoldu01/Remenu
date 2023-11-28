const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../middleware/isAuthenticated');
const dishController = require('../controllers/dishController');

router.post('/', isAuthenticated, dishController.createDish); // Create a new dish
router.get('/:dishId', dishController.getDish); // Get a specific dish
router.put('/:dishId', isAuthenticated, dishController.updateDish); // Update a dish
router.delete('/:dishId', isAuthenticated, dishController.deleteDish); // Delete a dish

module.exports = router;
