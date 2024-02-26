const { addToCart, getCartItems } = require('../../controllers/user/cart/cartController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const catchAsync = require('../../services/catchAsync')

const router = require('express').Router()

router.route('/').get(isAuthenticated,catchAsync(getCartItems))
router.route('/:id').post(isAuthenticated,catchAsync(addToCart))

module.exports = router