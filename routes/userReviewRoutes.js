const { getProductReview, createReview, deleteReview } = require('../controllers/user/Controller')
const isAuthenticated = require('../middleware/isAuthenticated')
const catchAsync = require('../services/catchAsync')

const router = require('express').Router

router.route('/reviews').post(isAuthenticated, catchAsync(createReview))

router.route('/reviews/:id')
.get(getProductReview)
.delete(isAuthenticated, deleteReview)

module.exports = router 