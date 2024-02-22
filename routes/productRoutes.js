const {getProducts,getproduct, createProduct, deleteProduct, editProduct} = require('../controllers/Admin/product/productController')
const isAuthenticated = require('../middleware/isAuthenticated')
const catchAsync = require('../services/catchAsync')
const restrictTo = require('../middleware/restrictTo')
const router = require('express').Router()
const {multer, storage} = require('../middleware/multerConfig');
const upload = multer({storage:storage})


// router.route('/product').post(isAuthenticated,restrictTo('admin'),upload.single('productImage'), createProduct)
router.route('/products')
.post(isAuthenticated,restrictTo("admin") ,upload.single('productImage'),catchAsync(createProduct) )
.get(catchAsync(getProducts))

//for single product
router.route('/products/:id')
.get(catchAsync(getproduct))
.delete(isAuthenticated, restrictTo("admin"),catchAsync(deleteProduct))
.patch(editProduct)

module.exports = router