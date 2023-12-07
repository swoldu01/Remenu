// AdminController.js
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const Dish = require('../models/dish');
const Review = require('../models/review');

//USER MANAGEMENT

    exports.searchUsersByEmail = async (req, res) => {
        const { email } = req.query;
        console.log(req.query)

        try {
            const users = await User.find({ email: new RegExp(email, 'i') }).select('-password');
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error searching users', error: error.message });
        }
    };

    exports.getUserDetails = async (req, res) => {
        const { userId } = req.params;
    
        try {
            const user = await User.findById(userId)
                                   .populate('restaurantIds') // Populating restaurant details if any exist
                                   .select('-password'); // Excluding the password for security
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user details', error: error.message });
        }
    };
    

    exports.updateUser = async (req, res) => {
        const { userId } = req.params;
        const updateData = req.body; // Contains the fields to be updated
    
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
    
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            res.status(200).json({ message: 'User updated successfully', data: updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    };
    


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
    

    exports.addRestaurantToUser = async (req, res) => {
        const { userId } = req.params;
        const { restaurantId } = req.body;
    
        try {
            // Find the user by userId
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Optionally, check if the restaurant exists
            const restaurantExists = await Restaurant.findById(restaurantId);
            if (!restaurantExists) {
                return res.status(404).json({ message: 'Restaurant not found' });
            }
    
            // Add the restaurantId to the user's restaurantIds array
            if (!user.restaurantIds.includes(restaurantId)) {
                user.restaurantIds.push(restaurantId);
                await user.save();
            }
    
            res.status(200).json({ message: 'Restaurant added to user successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error adding restaurant to user', error: error.message });
        }
    };
    

    exports.deleteUser = async (req, res) => {
        const { userId } = req.params;
        try {
            // Find the user by ID
            const userToDelete = await User.findById(userId);
            if (!userToDelete) {
                return res.status(404).json({ message: 'User not found' });
            }

          // Pre-deletion logic for 'reviewer' role
          if (userToDelete.role === 'reviewer') {
            await Promise.all([
                Review.deleteMany({ user: userId }),
                Like.deleteMany({ user: userId }),
                Photo.deleteMany({ user: userId })
            ]);
        }
            await User.findByIdAndDelete(userId);
    
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    };
    
  
//RESATAURANT MANAGEMENT

    exports.searchRestaurantByName = async (req, res) => {
        const { name } = req.query;
        console.log(req.query)

        try {
            const users = await Restaurant.find({ name: new RegExp(name, 'i') });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error searching users', error: error.message });
        }
    };

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
    
