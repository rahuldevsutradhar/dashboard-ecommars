const { verify } = require('jsonwebtoken')
const mongoose = require('mongoose')

const productSchma = new mongoose.Schema({
      veriyent : [{
        veriyentName:{
            type:String,
            default:null,
            enum:['color' , 'size']
        },
        verifyValue:{
            type:String,
            default:null
        },
        additionalCharges:{
            type:String,
            default:null
        }
      }]
})


module.exports= mongoose.model('products' , productSchma)