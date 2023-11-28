const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who liked
  likedOn: { type: Date, default: Date.now },
  item: { type: Schema.Types.ObjectId, required: true, refPath: 'onModel' },
    // What this like is for (photo, review, dish, restaurant)
  onModel: { type: String, required: true, enum: ['Dish', 'Restaurant', 'Photo', 'Review'] },
});

module.exports = mongoose.model('Like', likeSchema);
