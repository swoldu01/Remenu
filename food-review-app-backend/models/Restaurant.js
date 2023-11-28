const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    location: String,
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
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }],
    likesCount: { type: Number, default: 0 }
  });
  
  const Restaurant = mongoose.model('Restaurant', restaurantSchema);
  module.exports = Restaurant;
  