const { createProduct, getProducts, getproduct } = require('../Admin/product/productController')
const isAuthenticated = require('../middleware/isAuthenticated')
const restrictTo = require('../middleware/restrictTo')
const catchAsync = require('../services/catchAsync')

const router = require('express').Router()
// const {multer, storage} = require('../middleware/multerConfig');
// const upload = multer({storage:storage})

// router.route('/product').post(isAuthenticated,restrictTo('admin'),upload.single('productImage'), createProduct)
router.route('/products')
.post(catchAsync(createProduct))
.get(catchAsync(getProducts))

//for single product
router.route('/products/:id')
.get(catchAsync(getproduct))
module.exports = router