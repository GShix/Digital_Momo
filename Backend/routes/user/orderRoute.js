const { createOrder, getMyOrders, cancelMyOrder, updateMyOrder, deleteMyOrder } = require('../../controllers/user/order/orderController');
const isAuthenticated = require('../../middleware/isAuthenticated');
const catchAsync = require('../../services/catchAsync');

const router = require('express').Router();

router.route('/')
.post(isAuthenticated,catchAsync(createOrder))
.get(isAuthenticated,catchAsync(getMyOrders))
router.route('/cancel').patch(isAuthenticated,catchAsync(cancelMyOrder))
router.route('/:id').patch(isAuthenticated,catchAsync(updateMyOrder)).delete(isAuthenticated,catchAsync(deleteMyOrder))

module.exports = router 