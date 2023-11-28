const dishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [String],
    price: Number,
    cuisineType: { type: String, required: true },
    dishSize: { type: String, enum: ['appetizer', 'main', 'dessert', 'side'] },
    dietaryRestrictions: [String], // e.g., ['gluten-free', 'vegan']
    allergies: [String], // e.g., ['nuts', 'shellfish']
    tags: [String], // Additional tags for the dish
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    averageRating: { type: Number, default: 0 },
    numberOfReviews: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    featuredPhotos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }] // Array of photo references

  });
  
  const Dish = mongoose.model('Dish', dishSchema);
  module.exports = Dish;
  