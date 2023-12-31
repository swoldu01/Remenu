const User = require('../models/user');
const sendEmail = require('../middleware/emailService')
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.userLogin = async (req, res) => {
  try {
    console.log(req.body)
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log('User not found');
      return res.status(401).send('User not found','Authentication failed');
    }
console.log(user)
    if (!bcrypt.compare(req.body.password, user.password)) {
      console.log('Password mismatch');
      return res.status(401).send('Password mismatch', 'Authentication failed');
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      userId: user._id,
      token: token,
      refreshToken: refreshToken,
      expiresIn: 3600,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.logout = async (req, res) => {
  try {
      const userId = req.userData._id; // Assuming you have userId in userData
      // Invalidate the refresh token for the user
      // This might involve setting a flag in your database
      // For example: await User.findByIdAndUpdate(userId, { refreshToken: null });
      
      res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
      console.error('Logout Error:', error);
      res.status(500).json({ message: 'Error during logout' });
  }
};


//Creates a user and send a verifiying email
exports.registerUser = async (req, res) => {
    try {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      const verificationToken = crypto.randomBytes(20).toString('hex');
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        role: 'reviewer', // Default role
        emailVerificationToken: verificationToken
      });
  
      await user.save();
    
    // Send verification email
    const email = user.email;
    const subject = 'Verify Your Email';
    const templateName = 'verificationEmail';
    const templateData = {
        username: user.username,
        verificationUrl: `http://localhost:5173/verify-email?token=${verificationToken}`
    };

sendEmail(email, subject, templateName, templateData);

  
      res.status(201).json({ message: 'User registered. Verification email sent.', userId: user._id });
    } catch (error) {
      console.error('Registration Error:', error);
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  };
  
//Confirms if a user has been verfied
exports.verifyEmail = async (req, res) => {
    try {
      const user = await User.findOne({ emailVerificationToken: req.query.token });
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired verification token' });
      }
  
      user.isEmailVerified = true;
      user.emailVerificationToken = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error('Verification Error:', error);
        res.status(500).send('Internal Server Error');
    }
};
  

exports.refreshToken = (req, res) => {
    const refreshToken = req.body.refreshToken;
    // Verify the refresh token with your database
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ accessToken });
};

//sends token and uses email provider to send email template
exports.requestPasswordReset = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const resetToken = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();
  
      const email = user.email;
      const subject = 'Reset Your Password';
      const templateName = 'passwordResetEmail';
      const templateData = {
        username: user.username,
        resetUrl: `http://localhost:5173/reset-password?token=${resetToken}`
      };
      
      sendEmail(email, subject, templateName, templateData);
      
  
      res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      res.status(500).json({ message: 'Error requesting password reset' });
    }
  };  
  

exports.resetPassword = async (req, res) => {
    try {
      const user = await User.findOne({ 
        resetPasswordToken: req.body.token, 
        resetPasswordExpires: { $gt: Date.now() } 
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
      }
  
      user.password = bcrypt.hashSync(req.body.newPassword, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error resetting password' });
    }
};
  