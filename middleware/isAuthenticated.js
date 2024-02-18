const jwt= require('jsonwebtoken');
// const promisify = require('util').promisify
const {promisify} = require('util');
const User = require('../model/userModel');

const isAuthenticated = async(req,res,next)=>{
    const token = req.headers.authorization
    // console.log(token)
    if(!token){
        return res.status(400).json({
            message:"Enter your Token"
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
        const doesUserFound = await User.findOne({_id:decoded.id})
        if(!doesUserFound){
            return res.status(400).json({
                message:"User with this Token/id not found"
            })
        }
        req.user = doesUserFound

        next()
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
    
    
    
}
module.exports = isAuthenticated