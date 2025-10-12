const generateSlug = require("../helpers/slugGenarator");
const authModel = require("../models/authModel");
const catagoryItem = require("../models/catagoryItem");
const productModel = require("../models/productModel");
const cloudinary = require('cloudinary').v2
const fs = require('fs')

cloudinary.config({
    cloud_name: 'dlptuisf0',
    api_key: '892345585254425',
    api_secret: 'jzhvFNAs0gGnZSCmArgSygtADG8'
});


// --------------- add_category ----------
const add_catagory = async (req, res) => {
    
  try {
    const {catagoryName} = req.body
    const exsiteCatagory = await catagoryItem.find({catagoryName})
    if(exsiteCatagory) return res.status(400).send(' catagory already exisit')

    if (!req.file) {
      return res.status(400).send("Please upload a category image");
    }

    const catagoryImage = await 
    cloudinary.uploader.upload(req.file.path, 
        {
             public_id: Date.now(),
        });

    const creatorUser = await authModel.findOne({ email: req.user.email });
    if (!creatorUser) return res.status(404).send("User not found");
    if (!catagoryImage || !catagoryImage.url) {
      return res.status(400).send("Category image upload failed");
    }

    await new catagoryItem({
      catagoryName,
      catagorName : creatorUser.userName,
      catagoryImage: catagoryImage.url,
      catagorEmail: creatorUser.email,
    }).save();

    res.status(200).send("Category uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};



// --------------- product_upload ----------
const product_upload = async (req, res) => {
  const {productTitle , productDescribtion , discountPersent , veriyent , stock , productTag , productCatagoryId , price} = req.body
   
  const discountPrice  = price - price * discountPersent / 100
  
  const slug = generateSlug(productTitle)
  
  // ----------main img upload ------------
  const thumbnailImage = await 
  cloudinary.uploader.upload(req.files.mainImaage[0].path , 
    {
      public_id: Date.now() ,
      folder: "thumbnailImages"
     })
  fs.unlink(req.files.mainImaage[0].path , (err)=>{console.log(err)})
  

  // ----------sub-img upload ------------
  const subImage = await Promise.all(
  req.files.subImage.map(async (item) => {
    const cloudinaryItem = await cloudinary.uploader.upload(item.path, {
      public_id: Date.now(),
      folder: "subImages",
    });

    await fs.promises.unlink(item.path);
    return cloudinaryItem.secure_url;
  })
);
res.send(subImage)
}

module.exports = { add_catagory, product_upload };
