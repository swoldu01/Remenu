const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    name: { type: String, required: true, index: true },
    price: Number,
    mainIngredients: [{type: String}],
    cuisineType: [{ type: String, required: true }],
    dishType: [{ type: String }],
    dietaryRestrictions: [{ type: String }],
    setting: [{ type: String }],
    tags: [String], // Additional tags for the dish
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', index: true },
    averageRating: { type: Number, default: 0 },
    numberOfReviews: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    featuredPhotos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }] // Array of photo references

  });
  
  const Dish = mongoose.model('Dish', dishSchema);
  module.exports = Dish;
  