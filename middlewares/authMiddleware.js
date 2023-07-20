const jwt = require('jsonwebtoken')

exports.appMiddleware = (req,res,next)=>{
    console.log("Inside application specific middleware");
    next()
}
exports.jwtMiddleware = (req,res,next)=>{
    // get token from req header

    console.log("Inside JWT Middleware");
    const token = req.headers["access-token"]
    // console.log(token);

    
    // verify token
   try{
    const {loginAcno} = jwt.verify(token,"supersecretkey12345")
    console.log(loginAcno);
    req.loginData = loginAcno
     next()

   }
   catch{
    res.status(406).json("Please login")
   }
    


}