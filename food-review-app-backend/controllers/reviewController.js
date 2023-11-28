// controllers/reviewController.js
const Review = require('../models/Review');
const Dish = require('../models/Dish');

exports.addReview = (req, res) => {
  const reviewData = {
    // Extract review data from request body or parameters
  };

  Review.create(reviewData)
    .then(review => {
      return Dish.findById(review.dish);
    })
    .then(dish => {
      // Update logic here
      dish.numberOfReviews++;
      dish.averageRating = (dish.averageRating * (dish.numberOfReviews - 1) + review.rating) / dish.numberOfReviews;
      
      return dish.save();
    })
    .then(() => {
      res.status(200).json({ message: "Review added and dish rating updated." });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};
