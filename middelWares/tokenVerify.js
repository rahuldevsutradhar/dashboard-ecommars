var jwt = require('jsonwebtoken');

const tokenVerify = (req , res , next)=>{
  try {
    const token = req.headers.authorization   
    if(!token) return req.status(401).send('asses token is not found')
     jwt.verify(token, process.env.jwt_seccret, (err, decoded)=>{
          if (err) return res.status(401).send('Token invalid')
            req.user = decoded
            next()
})
  } catch (error) {
    console.log(error)
    res.status(501).send('Internal server error')   
  }
        
}

module.exports = tokenVerify