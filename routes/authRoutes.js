const { registerUser, loginUser, forgotPassword, verifyOtp, resetPassword } = require('../controllers/auth/authControllers');
// const catchAsync = require('../services/catchAsync');

const router = require('express').Router();

router.route("/register").post(( registerUser));
router.route("/login").post((loginUser));
router.route("/forgotpassword").post((forgotPassword));
router.route("/verifyotp").post((verifyOtp));
router.route("/resetpassword").post((resetPassword));

module.exports =router