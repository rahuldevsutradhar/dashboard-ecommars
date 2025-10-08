const roleChecker =(acessRole)=>{
    return (req,  res, next)=>{
         
       if(acessRole.includes(req.user.role)){
        next()
       }else{
        res.status(401).send('Inable to this features ')
       }
}
}
module.exports = roleChecker