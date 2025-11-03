const express = require('express');
const { registrationController, otpVerification, reSendOtp, loginController, updateProfileController, single_profile } = require('../../controller/authController');
const tokenVerify = require('../../../middelWares/tokenVerify');
const { product_upload } = require('../../controller/productController'); // ✅ fixed line
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const authRoute = express.Router();

authRoute.post('/registration', registrationController);
authRoute.post('/otp', otpVerification);
authRoute.post('/reSendOtp', reSendOtp);
authRoute.post('/login', loginController);
authRoute.post('/updateProfile', tokenVerify, upload.single('avatar'), updateProfileController);
authRoute.get('/singleProfile',tokenVerify ,  single_profile);

module.exports = authRoute;
