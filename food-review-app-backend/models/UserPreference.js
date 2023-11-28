const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPreferenceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  likedDishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }],
  likedRestaurants: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }],
  likedPhotos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
  likedReviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

module.exports = mongoose.model('UserPreference', userPreferenceSchema);
