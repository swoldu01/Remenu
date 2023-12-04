// AdminController.js
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const Dish = require('../models/dish');
const Review = require('../models/review');

//USER MANAGEMENT

    exports.listAllUsers = async (req, res) => {
        try {
            const users = await User.find({}).select('-password');
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    };

    exports.updateUserRole = async (req, res) => {
        const { userId, newRole } = req.body;
        try {
        const updatedUser = await User.findByIdAndUpdate(userId, { role: newRole }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
        } catch (error) {
        res.status(500).json({ message: 'Error updating user role', error: error.message });
        }
    };
    

    exports.deleteUser = async (req, res) => {
        const { userId } = req.params;
        try {
        const userToDelete = await User.findById(userId);
        if (!userToDelete) {
            return res.status(404).json({ message: 'User not found' });
        }
        await userToDelete.remove();
        res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    };
  
//RESATAURANT MANAGEMENT

    exports.listAllRestaurants = async (req, res) => {
        try {
        const restaurants = await Restaurant.find({}).populate('dishes').populate('owner', 'username email');
        res.status(200).json(restaurants);
        } catch (error) {
        res.status(500).json({ message: 'Error fetching restaurants', error: error.message });
        }
    };
    

    exports.createRestaurant = async (req, res) => {
        const restaurantData = req.body;
        try {
        const newRestaurant = new Restaurant(restaurantData);
        await newRestaurant.save();
        res.status(201).json(newRestaurant);
        } catch (error) {
        res.status(500).json({ message: 'Error creating restaurant', error: error.message });
        }
    };
    

    exports.updateRestaurant = async (req, res) => {
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
    

    exports.deleteRestaurant = async (req, res) => {
        const { restaurantId } = req.params;
        try {
        const restaurantToDelete = await Restaurant.findById(restaurantId);
        if (!restaurantToDelete) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        await restaurantToDelete.remove();
        res.status(200).json({ message: 'Restaurant deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: 'Error deleting restaurant', error: error.message });
        }
    };

//DISH MANAGEMENT

    exports.listAllDishes = async (req, res) => {
        try {
        const dishes = await Dish.find({}).populate('restaurant', 'name location');
        res.status(200).json(dishes);
        } catch (error) {
        res.status(500).json({ message: 'Error fetching dishes', error: error.message });
        }
    };


    exports.addDish = async (req, res) => {
        const dishData = req.body;
        try {
        const newDish = new Dish(dishData);
        await newDish.save();
        res.status(201).json(newDish);
        } catch (error) {
        res.status(500).json({ message: 'Error adding dish', error: error.message });
        }
    };
    

    exports.updateDish = async (req, res) => {
        const { dishId } = req.params;
        const updateData = req.body;
        try {
        const updatedDish = await Dish.findByIdAndUpdate(dishId, updateData, { new: true });
        if (!updatedDish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        res.status(200).json(updatedDish);
        } catch (error) {
        res.status(500).json({ message: 'Error updating dish', error: error.message });
        }
    };
    

    exports.deleteDish = async (req, res) => {
        const { dishId } = req.params;
        try {
        const dishToDelete = await Dish.findById(dishId);
        if (!dishToDelete) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        await dishToDelete.remove();
        res.status(200).json({ message: 'Dish deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: 'Error deleting dish', error: error.message });
        }
    };
  

// REVIEW MANAGEMENT

    exports.listAllReviews = async (req, res) => {
        try {
        const reviews = await Review.find({}).populate('dish', 'name').populate('user', 'username email');
        res.status(200).json(reviews);
        } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
        }
    };
    

    exports.deleteReview = async (req, res) => {
        const { reviewId } = req.params;
        try {
        const reviewToDelete = await Review.findById(reviewId);
        if (!reviewToDelete) {
            return res.status(404).json({ message: 'Review not found' });
        }
        await reviewToDelete.remove();
        res.status(200).json({ message: 'Review deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error: error.message });
        }
    };
    
