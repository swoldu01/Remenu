const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  dish: { type: Schema.Types.ObjectId, ref: 'Dish', index: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  rating: { type: Number, required: true },
  comment: String,
  date: { type: Date, default: Date.now },
  likesCount: { type: Number, default: 0 }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
