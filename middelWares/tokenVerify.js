var jwt = require('jsonwebtoken');

const tokenVerify = (req , res , next)=>{
    const token = req.headers.authorization

    const verification = jwt.verify(token, process.env.jwt_seccret, (err, decoded)=>{
          if (err) return res.status(401).send('Token invalid')
            next()
})    
}

module.exports = tokenVerify