const { verify } = require('jsonwebtoken')
const mongoose = require('mongoose')

const productSchma = new mongoose.Schema({
      ProductImage:{
        type:String,
        required:true
      },
      productTag:{
        type:String,
        default:null
      },
      thubnilImage:{
         type:String,
         required:true
      },
      productSubImage:[],
      productTitle:{
         type:String,
         required:true
      },
      productDescribtion:{
         type:String,
         required:true
      },
      productPrice:{
         type:String,
         required:true
      },
      productReview:[{
        reviewerName:{type:String, default:null},
        revieweRating:{type:String, default:null},
        revieweComent:{type:String, default:null},
        revieweDate:{type:Date, default:null},

      }],
      adminApproval:{
        type:String,
        default:'pandding',
        enum:['acceptable', 'pandding', 'rejected']
      },
      productVarient:{
        type:String,
        default:null
      },
      discountPrice:{
        type:String,
        default:null
      },
      discountPersent:{
        type:String,
        default:null
      },
      slug:{
        type:String,
         required:true
      },
      productCatagory:{
         type:String,
         required:true
      },
      stock:{
         type:String,
         required:true
      },
      veriyent : [{
        veriyentName:{type:String, default:null, enum:['color' , 'size']},
        verifyValue:{type:String, default:null},
        additionalCharges:{ type:String, default:null }
      }]
})


module.exports= mongoose.model('products' , productSchma)