const express = require('express');
const { add_catagory } = require('../../../controller/productController'); // path ঠিক রাখতে হবে
const { product_upload } = require('../../controller/productController');

const productRoute = express.Router();

productRoute.post('/category', add_catagory);
productRoute.post('/uploadProduct', product_upload);

module.exports = productRoute;
