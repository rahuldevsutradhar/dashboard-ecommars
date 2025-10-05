const express =  require('express')
const { registrationController, otpVerification, reSendOtp, loginController, updateProfileController } = require('../../controller/authController')
const tokenVerify = require('../../../middelWares/tokenVerify')
const authRoute = express.Router()
const multer  = require('multer')
const product_upload = require('../../controller/productController')
const upload = multer({ dest: 'uploads/' })

authRoute.post('/registration', registrationController)
authRoute.post('/otp', otpVerification)
authRoute.post('/reSendOtp', reSendOtp)
authRoute.post('/login', loginController)
authRoute.post('/updateProfile', tokenVerify, upload.single('avatar'),  updateProfileController)

module.exports = authRoute