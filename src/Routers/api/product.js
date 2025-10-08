const express = require('express');
const { add_catagory, product_upload } = require('../../controller/productController');
const multer  = require('multer');
const tokenVerify = require('../../../middelWares/tokenVerify');
const roleChecker = require('../../../middelWares/roleCheckerUser');

const upload = multer({ dest: 'uploads/' });
const uploadMiddleware = upload.fields([
  { name: 'mainImaage', maxCount: 1 },
  { name: 'subImage', maxCount: 8 }
]);

const productRoute = express.Router();

productRoute.post( '/category', tokenVerify, roleChecker(['admin', 'staff']), upload.single('productCatagory'), add_catagory)

productRoute.post('/uploadProduct', uploadMiddleware, product_upload);

module.exports = productRoute;
