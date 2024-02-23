const router = require('express').Router()
const { getUsers } = require('../controllers/Admin/user/userController')
const isAuthenticated = require('../middleware/isAuthenticated')
const restrictTo = require('../middleware/restrictTo')

router.route('/users').get(isAuthenticated,restrictTo('admin'), getUsers)

module.exports = router