const mongoose = require('mongoose')

const catagorySchema = new mongoose.Schema({
    catagoryName:{
        type: String,
        required: true
       
    },
    catagorName:{
        type: String,
        required: true
    },
    catagorEmail:{
        type: String,
        required: true
    },
    catagoryImage:{
        type: String,
        required: true
    }
    
}, {Timestamp:true})

module.exports = mongoose.model('catagory', catagorySchema)