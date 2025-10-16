const { verify } = require('jsonwebtoken')
const mongoose = require('mongoose')

const productSchma = new mongoose.Schema({
      ProductImage:{
        type:String,
       default:null
      },
      productTag:{
        type:String,
        default:null
      },
      mainImaage:{
         type:String,
         required:true
      },
      subImage:[],
      productTitle:{
         type:String,
         required:true
      },
      productDescribtion:{
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
        enum:['approved', 'pandding', 'rejected']
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
      stock:{
         type:String,
         required:true
      },
      productCatagoryId:{
        type: mongoose.Schema.ObjectId,
        required: true
      },
      veriyent : [{
        veriyentName:{type:String, default:null, enum:['color' , 'size']},
        verifyValue:[],
        additionalCharges:{ type:String, default:null }
      }],
      price:{
         type:Number,
         required:true
      }
})


module.exports= mongoose.model('products' , productSchma)