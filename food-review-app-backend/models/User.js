const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: { type: String,},
  email: { type: String, required: true, unique: true },
  profilePhoto: String,
  bio: String,
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'owner', 'reviewer'],
    required: true
  },
  restaurantIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }],
  emailVerificationToken: String,
  isEmailVerified: { type: Boolean, default: false }
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Pre-remove hook for reviewer type user
userSchema.pre('remove', function(next) {
  if (this.role === 'reviewer') {
    const userId = this._id;
    Promise.all([
      this.model('Review').deleteMany({ user: userId }),
      this.model('Like').deleteMany({ user: userId }),
      this.model('Photo').deleteMany({ user: userId })
    ])
    .then(() => next())
    .catch(err => next(err));
  } else {
    next();
  }
});


const User = mongoose.model('User', userSchema);
module.exports = User;
