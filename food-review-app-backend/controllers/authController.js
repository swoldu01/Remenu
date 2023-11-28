const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send('Authentication failed');
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      userId: user._id,
      token: token,
      expiresIn: 3600,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }

  const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
// Store this refreshToken in your database against the user for validation later
res.status(200).json({ accessToken, refreshToken,});

};

exports.registerUser = async (req, res) => {
    try {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        role: 'reviewer' // Default role
      });
  
      const savedUser = await user.save();
      res.status(201).json({ message: 'User registered successfully', userId: savedUser._id });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user' });
    }
  };
  
  exports.refreshToken = (req, res) => {
    const refreshToken = req.body.token;
    // Verify the refresh token with your database
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ accessToken });
  };
  