const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.userLogin);
router.post('/register', authController.registerUser);
router.post('/refresh-token', authController.refreshToken);


module.exports = router;
