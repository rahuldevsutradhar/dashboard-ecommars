const authModel = require("../models/authModel");
const catagoryItem = require("../models/catagoryItem");
const productModel = require("../models/productModel");
const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name: 'dlptuisf0',
    api_key: '892345585254425',
    api_secret: 'jzhvFNAs0gGnZSCmArgSygtADG8'
});


// --------------- add_category ----------
const add_catagory = async (req, res) => {
    try {
        const catagoryImage = await cloudinary.uploader.upload(
            req.file.path, {
            public_id: Date.now(),
        });

        const creatorUser = await authModel.findOne({ email: req.user.email });

        if (!creatorUser)return res.status(404).send("User not found");       
        if (!catagoryImage || !catagoryImage.url)return res.status(400).send("Category image upload failed");
        
        await new catagoryItem({
            // categoryName: creatorUser.userName,
            catagoryImage: catagoryImage.url,
            catagorEmail: creatorUser.email,
        }).save();
        
        res.status(200).send("Category uploaded successfully");
    }
    catch (error) {
        console.log(error);
    }
}



// --------------- product_upload ----------
const product_upload = async (req, res) => {
    const { veriyent } = req.body;
    if (!veriyent) {
        return res.status(400).send("Variant is required");
    }

    await new productModel({ veriyent }).save();

    res.send("product uploaded")
};

module.exports = { add_catagory, product_upload };
