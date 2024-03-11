const { getMyProfile, deleteProfile, updateProfile, updatePassword } = require('../../controllers/user/profile/profileController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const catchAsync = require('../../services/catchAsync')

const router = require('express').Router()

router.route('/').get(isAuthenticated, catchAsync(getMyProfile))
.delete(isAuthenticated,catchAsync(deleteProfile))
.patch(isAuthenticated,catchAsync(updateProfile))

router.route('/changePassword').patch(isAuthenticated,catchAsync(updatePassword))
module.exports = router