const express = require('express');
const { add_catagory } = require('../../controller/productController');
const { product_upload } = require('../../controller/productController');
const productRoute = express.Router();
const multer  = require('multer');
const tokenVerify = require('../../../middelWares/tokenVerify');
const upload = multer({ dest: 'uploads/' })
const uploadMiddleware = upload.fields([{ name: 'mainImaage', maxCount: 1 }, { name: 'subImage', maxCount: 8 }])



productRoute.post('/category', tokenVerify,  upload.single('productCatagory') , add_catagory);
productRoute.post('/uploadProduct', uploadMiddleware,  product_upload);

module.exports = productRoute;
