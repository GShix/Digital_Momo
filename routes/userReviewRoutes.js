const { getProductReview, createReview, deleteReview } = require('../controllers/user/Controller')
const isAuthenticated = require('../middleware/isAuthenticated')
const catchAsync = require('../services/catchAsync')

const router = require('express').Router()


router.route('/reviews')
router.route('/reviews/:id')
.get(getProductReview)
.post(isAuthenticated, catchAsync(createReview))
.delete(isAuthenticated, deleteReview)

module.exports = router 