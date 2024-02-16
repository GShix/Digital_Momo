const { registerUser, loginUser, forgotPassword, verifyOtp } = require('../controllers/auth/authControllers');

const router = require('express').Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgotpassword").post(forgotPassword);
router.route("/verifyotp").post(verifyOtp);

module.exports =router