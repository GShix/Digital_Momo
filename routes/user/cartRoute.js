const { addToCart } = require('../../controllers/user/cart/cartController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const catchAsync = require('../../services/catchAsync')

const router = require('express').Router()

router.route('/').post(isAuthenticated,catchAsync(addToCart))

module.exports = router