const express = require('express');
const { add_catagory, product_upload, product_update, admin_approval, give_review, singleProduct, get_all_product, delete_product } = require('../../controller/productController');
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
productRoute.post('/uploadProduct', tokenVerify, roleChecker(['admin', 'staff']) , uploadMiddleware , product_upload);
productRoute.post('/updateProduct', tokenVerify, roleChecker(['admin', 'staff']) , uploadMiddleware , product_update);
productRoute.post('/updateStatus', tokenVerify, roleChecker(['admin']) ,  admin_approval);
productRoute.post('/giveReview', tokenVerify  ,  give_review);
productRoute.get('/singleProduct/:slug',   singleProduct);
productRoute.get('/allProduct',   get_all_product);
productRoute.delete('/deleteProduct',   delete_product);

module.exports = productRoute;
