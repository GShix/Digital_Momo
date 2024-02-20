const {getProducts,getproduct, createProduct} = require('../controllers/Admin/product/productController')
const isAuthenticated = require('../middleware/isAuthenticated')
const catchAsync = require('../services/catchAsync')

const router = require('express').Router()
const {multer, storage} = require('../middleware/multerConfig');
const upload = multer({storage:storage})

// router.route('/product').post(isAuthenticated,restrictTo('admin'),upload.single('productImage'), createProduct)
router.route('/products')
.post(isAuthenticated,upload.single('productImage'),(createProduct) )
.get(catchAsync(getProducts))

//for single product
router.route('/products/:id')
.get(catchAsync(getproduct))

module.exports = router