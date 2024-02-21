// check the role of user 

const restrictTo = (...roles)=>{
    return(req,res,next)=>{
        const userRole = req.user.role
        // console.log(userRole)
        // return
        if(!roles.includes(userRole)){
            res.status(403).json({
                message:"You don't have permission"
            })
        }else{
            next()
        }
    }
}

module.exports = restrictTo