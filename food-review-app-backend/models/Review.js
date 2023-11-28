const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  dish: { type: Schema.Types.ObjectId, ref: 'Dish' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true },
  comment: String,
  date: Date,
  likesCount: { type: Number, default: 0 }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
