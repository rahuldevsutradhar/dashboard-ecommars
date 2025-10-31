const { default: mongoose } = require("mongoose");
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
    const { catagoryName } = req.body
    const exsiteCatagory = await catagoryItem.find({ catagoryName })
    if (exsiteCatagory) return res.status(400).send(' catagory already exisit')

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
      catagorName: creatorUser.userName,
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
  const { productTitle, productDescribtion, discountPersent, veriyent, stock, productTag, productCatagoryId, price } = req.body

  const discountPrice = price - price * discountPersent / 100

  const slug = generateSlug(productTitle)

  // ----------main img upload ------------
  const mainImaage = await
    cloudinary.uploader.upload(req.files.mainImaage[0].path,
      {
        public_id: Date.now(),
        folder: "thumbnailImages"
      })
  fs.unlink(req.files.mainImaage[0].path, (err) => { console.log(err) })


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

  await new productModel({
    productTitle,
    productDescribtion,
    discountPersent,
    veriyent: JSON.parse(veriyent),
    stock,
    productTag,
    productCatagoryId,
    price,
    discountPrice,
    slug,
    mainImaage: mainImaage.url,
    subImage
  }).save()

  res.send('catagory  product uploaded')
}


// -------------------------------- product_UpDate -----------------------------------------
const product_update = async (req, res) => {
  try {
    const {
      mainImaage,
      subImage,
      productTitle,
      productDescribtion,
      discountPersent,
      veriyent,
      stock,
      productTag,
      productCatagoryId,
      price,
      slug
    } = req.body;

    // ---------- Find product ----------
    const exisitProduct = await productModel.findOne({ slug });
    if (!exisitProduct) return res.status(404).send("Product not found ❌");


      // ---------- Delete old images from cloudinary ----------
    if (exisitProduct.mainImaage) {
      await cloudinary.uploader.destroy(
        exisitProduct.mainImaage.split("/").slice(7).join("/").split(".")[0]
      );
    }

    if (Array.isArray(exisitProduct.subImage) && exisitProduct.subImage.length > 0) {
      await Promise.all(
        exisitProduct.subImage.map(async (item) => {
          await cloudinary.uploader.destroy(
            item.split("/").slice(7).join("/").split(".")[0]
          );
        })
      );
    }

    // ---------- Update product fields ----------
    if (productTitle) {
      exisitProduct.productTitle = productTitle;
      exisitProduct.slug = generateSlug(productTitle);
    }

    if (productDescribtion) exisitProduct.productDescribtion = productDescribtion;
    if (veriyent) exisitProduct.veriyent = JSON.parse(veriyent);
    if (stock !== undefined && stock !== null) exisitProduct.stock = stock;
    if (productTag) exisitProduct.productTag = productTag;
    if (productCatagoryId) exisitProduct.productCatagoryId = productCatagoryId;

    // ---------- Price & Discount Logic ----------
    // handle price update first
    if (price !== undefined && price !== null) {
      exisitProduct.price = price;
    }

    // then handle discount
    if (discountPersent !== undefined && discountPersent !== null) {
      exisitProduct.discountPersent = discountPersent;

      // use latest price (either new one or existing one)
      const basePrice = price ?? exisitProduct.price;
      exisitProduct.discountPrice = basePrice - (basePrice * discountPersent) / 100;
    } else {
      // no discount change, but if price changed then recalc using existing discount
      const discount = exisitProduct.discountPersent || 0;
      const basePrice = price ?? exisitProduct.price;
      exisitProduct.discountPrice = basePrice - (basePrice * discount) / 100;
    }
    
    if(mainImaage) exisitProduct.mainImaage = mainImaage.url
    if(subImage) exisitProduct.subImage = subImage


    await exisitProduct.save();

  

    res.status(200).send("✅ Product updated successfully");

  } catch (error) {
    console.error("Product update error:", error);
    res.status(500).send("Server error during update ❌");
  }
};


// -------------------------------- Admin approval -----------------------------------------

const admin_approval = async (req , res)=>{
  const { slug , status} = req.body

  if(status != "approved" && status != "rejected") return res.status(400).send('wrong status use approved or rejected status ')

    const exisitProduct = await productModel.findOne({slug})
    if(!exisitProduct) return res.status(404).send('product not found')

      exisitProduct.adminApproval = status
     await exisitProduct.save()

     res.status(200).send('status update sucessfull')
}


// -------------------------------- give review -----------------------------------------
const give_review = async (req , res)=>{
    const { slug , reviewerName , revieweRating , revieweComent } = req.body
        if(!reviewerName || !revieweRating || !revieweComent ) 
          return res.status(400).send('All filled is required ')
    
    const exisitProduct = await productModel.findOne({slug})
           if(!exisitProduct) return res.status(404).send('product not found')
    
      exisitProduct.productReview.push ({reviewerName , revieweRating , revieweComent , revieweDate : new Date().toLocaleString()})
    
      await exisitProduct.save()

      res.status(200).send('review send sucessfull')
}


// --------------------------------get single product-----------------------------------------

const singleProduct = async (req, res)=>{
  const {slug} = req.params
  const exisitProduct = await productModel.findOne({slug})
             if(!exisitProduct) return res.status(404).send('product not found')

        res.status(200).send(exisitProduct)

}

// --------------------------------get All product-----------------------------------------
const get_all_product  = async (req , res)=>{
  try{
 const  productLimitNo =  req.query.productLimit || 10
 const allProduct  = await productModel.find().limit(productLimitNo)
  res.status(200).send(allProduct)

  }catch(err){
    console.log(err);  
    res.status(500).send('Internal Server Error')
  }
}








module.exports = { add_catagory ,
   product_upload ,  product_update ,
    admin_approval ,  give_review ,
    singleProduct, get_all_product
  };
