const { getOrders, getSingleOrder, updateOrder, deleteOrder } = require('../../controllers/Admin/order/orderController');
const isAuthenticated = require('../../middleware/isAuthenticated');
const restrictTo = require('../../middleware/restrictTo');
const catchAsync = require('../../services/catchAsync');


const router = require('express').Router();

router.route('/')
.get(isAuthenticated,restrictTo('admin'), catchAsync(getOrders))
router.route('/:id')
.get(isAuthenticated,restrictTo('admin'), catchAsync(getSingleOrder))
.patch(isAuthenticated,restrictTo('admin'), catchAsync(updateOrder))
.delete(isAuthenticated,restrictTo('admin'), catchAsync(deleteOrder))
module.exports = router 