
const { getMyReview, createReview, deleteReview } = require('../../controllers/user/review/reviewController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const restrictTo = require('../../middleware/restrictTo')
const catchAsync = require('../../services/catchAsync')

const router = require('express').Router()


router.route('/').get(isAuthenticated, catchAsync(getMyReview))
router.route('/:id')
.post(isAuthenticated,restrictTo('user'), catchAsync(createReview))
.delete(isAuthenticated, deleteReview)

module.exports = router 