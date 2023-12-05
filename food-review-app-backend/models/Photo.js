const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  url: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }, 
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  dish: { type: Schema.Types.ObjectId, ref: 'Dish' },
  review: { type: Schema.Types.ObjectId, ref: 'Review' },
  uploadDate: { type: Date, default: Date.now },
  description: String,
  flagged: { type: Boolean, default: false },
  flagReason: String,
  likesCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Photo', photoSchema);
