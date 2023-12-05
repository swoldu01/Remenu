const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: { type: String, required: true, index: true },
    description: String,
    location: { type: String, required: true, index: true },
    contactinfo: String,
    hoursOfOperation: {
        monday: { open: String, close: String },
        tuesday: { open: String, close: String },
        wednesday: { open: String, close: String },
        thursday: { open: String, close: String },
        friday: { open: String, close: String },
        saturday: { open: String, close: String },
        sunday: { open: String, close: String },
    },
    cuisineType: [{ type: String, required: true }],
    dishType: [{ type: String }],
    dietaryRestrictions: [{ type: String }],
    restaurantCategory: [{ type: String }],
    setting: [{ type: String }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }],
    likesCount: { type: Number, default: 0 }
  });

  // Pre-remove hook for restaurant
restaurantSchema.pre('remove', function(next) {
    this.model('Dish').deleteMany({ restaurant: this._id }, next);
  });
  
  const Restaurant = mongoose.model('Restaurant', restaurantSchema);
  module.exports = Restaurant;
  