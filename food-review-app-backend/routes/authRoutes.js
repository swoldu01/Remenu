const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const authController = require('../controllers/authController');

// Rate limit
const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 account creation requests per `window` per hour
    message: 'Too many accounts created from this IP, please try again after an hour'
  });

router.post('/login', authController.userLogin);
router.post('/register', createAccountLimiter, authController.registerUser);
router.post('/refresh-token', authController.refreshToken);
router.post('/request-reset-password', authController.requestPasswordReset);
router.post('/reset-password', authController.resetPassword);
router.get('/verify-email', authController.verifyEmail);



module.exports = router;
