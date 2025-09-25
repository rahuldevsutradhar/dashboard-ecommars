const productModel = require("../models/productModel");
const cloudinary = require('cloudinary').v2


cloudinary.config({ 
        cloud_name: 'dlptuisf0', 
        api_key: '892345585254425', 
        api_secret: 'jzhvFNAs0gGnZSCmArgSygtADG8' // Click 'View API Keys' above to copy your API secret
    });


// --------------- add_category ----------
const add_catagory =async (req, res) => {

    res.send('this is add catagory')
    };

// --------------- product_upload ----------
const product_upload = async (req, res) => {
    const { variant } = req.body;
    if (!variant) {
        return res.status(400).send("Variant is required");
    }

    await new productModel({ variant }).save();
    res.send("Variant uploaded");
};

module.exports = { add_catagory, product_upload };
