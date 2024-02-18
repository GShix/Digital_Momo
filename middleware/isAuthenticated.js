const jwt= require('jsonwebtoken')
const isAuthenticated = (req,res,next)=>{
    // console.log("Hi I am from Authorization")
    const token = req.headers.authorization
    // console.log(token)
    if(!token){
        return res.status(400).json({
            message:"Enter your Token"
        })
    }
    //token verify
    jwt.verify(token,process.env.SECRET_KEY,(err,success)=>{ //using callback(err,success)
        if(err){
            res.status(400).json({
                message:"Invalid Token"
            })
        }else{
            res.status(200).json({
                message:"Valid Token"
            })
        }
    })
    //next()
}
module.exports = isAuthenticated