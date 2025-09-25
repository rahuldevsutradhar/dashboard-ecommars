const express =  require('express')
const authRoute = require('./api/auth')
const productRoute = require('./api/product')
const route = express.Router()


route.use('/auth', authRoute)
route.use('/product', productRoute)



module.exports = route