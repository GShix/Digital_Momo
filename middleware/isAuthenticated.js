const jwt= require('jsonwebtoken');
const User = require('../model/userModel');
// const {promisify} = require('util');
const promisify = require('util').promisify

const isAuthenticated = async(req,res,next)=>{
    const token = req.headers.authorization
    if(!token){
        return res.status(400).json({
            message:"Please Login and get a token"
        })
    }
    //token verify-1
    // jwt.verify(token,process.env.SECRET_KEY,(err,success)=>{ //using callback(err,success)
    //     if(err){
    //         res.status(400).json({
    //             message:"Invalid Token"
    //         })
    //     }else{
    //         res.status(200).json({
    //             message:"Valid Token"
    //         })
    //     }
    // })

    //token verify-2
        try {
            const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
        if(!decoded){
            return res.status(403).json({
                message:"Don't try this"
            })
        }
        //check userFound or not
        const doesUserFound = await User.findOne({_id:decoded.id})
        if(!doesUserFound){
            return res.status(400).json({
                message:"User with this Token/id not found"
            })
        }
        req.user = doesUserFound

        // next()
        } catch (error) {
            
        }
        res.status(400).json({
            message:error.message
        })
}
    
    
    
module.exports = isAuthenticated