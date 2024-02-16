const { registerUser, loginUser, forgotPassword } = require('../controllers/auth/authControllers');

const router = require('express').Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgotpassword").post(forgotPassword);

module.exports =router