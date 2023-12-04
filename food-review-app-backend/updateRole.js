const mongoose = require('mongoose');
const User = require('./models/user'); // Replace with the actual path to your User model

const username = "swoldu01@gmail.com"; // Replace with the username of the account you want to update
const newRole = "admin"; // The new role you want to assign

mongoose.connect('mongodb+srv://swoldu01:ELUdhevn3WjRhIfT@cluster0.nnzbvds.mongodb.net/?retryWrites=true&w=majority')
  .then(async () => {
    console.log('Successfully connected to MongoDB.');

    // Find and update the user
    const user = await User.findOne({ email: username });
    if (user) {
      user.role = newRole;
      await user.save();
      console.log(`User role updated: ${username} is now a ${newRole}`);
    } else {
      console.log('User not found.');
    }

    // Disconnect from database
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Database connection error:', err);
    mongoose.disconnect();
  });
