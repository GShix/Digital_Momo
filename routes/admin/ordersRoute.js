const { getOrders, getSingleOrder, updateOrder } = require('../../controllers/Admin/order/orderController');
const isAuthenticated = require('../../middleware/isAuthenticated');
const catchAsync = require('../../services/catchAsync');


const router = require('express').Router();

router.route('/')
.get(isAuthenticated,catchAsync(getOrders))
router.route('/:id').get(isAuthenticated,catchAsync(getSingleOrder)).patch(isAuthenticated,catchAsync(updateOrder))
router.route()
module.exports = router 