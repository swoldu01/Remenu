const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  url: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },   // Reference to User
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' }, // Reference to Restaurant
  uploadDate: { type: Date, default: Date.now },
  description: String,
  flagged: { type: Boolean, default: false },
  flagReason: String,
  likesCount: { type: Number, default: 0 }
  // Additional fields for metadata, timestamps, etc.
});

module.exports = mongoose.model('Photo', photoSchema);
