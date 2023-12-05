const express = require('express');
const router = express.Router();
const OwnerController = require('../controllers/ownerController')
const isAuthenticated = require('../middleware/isAuthenticated');
const checkRole = require('../middleware/checkRole');
const checkOwner = require('../middleware/checkOwner');


// Restaurant Management
router.get('/owner/restaurants', isAuthenticated, checkRole(['owner']), OwnerController.listOwnerRestaurants);

module.exports = router;