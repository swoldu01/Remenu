const User = require('../models/user');
const sendEmail = require('../middleware/emailService')
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.listOwnerRestaurants = async (req, res) => {
    try {
        const ownerId = req.userData._id; 
        const restaurants = await Restaurant.find({ owner: ownerId });
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching restaurants', error: error.message });
    }   
};

exports.updateownerRestaurants = async (req, res) => {
    const { restaurantId } = req.params;
    const updateData = req.body;
    try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, updateData, { new: true });
    if (!updatedRestaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(updatedRestaurant);
    } catch (error) {
    res.status(500).json({ message: 'Error updating restaurant', error: error.message });
    }
};

