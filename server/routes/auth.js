const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const { registerUser, loginUser, forgotPassword } = require('../controllers/authController');

require('dotenv').config();


router.post('/signup', registerUser);
router.post('/login',loginUser);
router.post('/forgot-password', forgotPassword);
const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT Secret:', process.env.JWT_SECRET);

router.get('/verify', authMiddleware,async (req, res) => {
  console.log('user from auth ::',req.user);
  res.json({ username: req.user.name })
});

router.get('/refresh', authMiddleware,async (req, res) => {
  console.log('user from auth ::',req.user);
  res.json( { message: `Perfect` })
});


module.exports = router;

