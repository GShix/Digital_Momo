const {createProduct, deleteProduct, editProduct} = require('../../controllers/Admin/product/productController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const catchAsync = require('../../services/catchAsync')
const restrictTo = require('../../middleware/restrictTo')
const router = require('express').Router()
const {multer, storage} = require('../../middleware/multerConfig');
const { getProducts, getproduct } = require('../../controllers/global/globalController')
const upload = multer({storage:storage})


// router.route('/product').post(isAuthenticated,restrictTo('admin'),upload.single('productImage'), createProduct)
router.route('/')
.post(isAuthenticated,restrictTo("admin") ,upload.single('productImage'),catchAsync(createProduct) )
.get(catchAsync(getProducts))

//for single product
router.route('/:id')
.get(catchAsync(getproduct))
.delete(isAuthenticated, restrictTo("admin"),catchAsync(deleteProduct))
.patch(isAuthenticated, restrictTo('admin'),upload.single('productImage'), catchAsync(editProduct))

module.exports = router