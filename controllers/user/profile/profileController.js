const User = require("../../../model/userModel")


//get my profile
exports.getMyProfile= async(req,res)=>{
    const userId= req.user.id
    const myProfile = await User.findById(userId)
    res.status(200).json({
        message:"Profile fetched successfully",
        data: myProfile
    })
}

// update my profile
exports.updateProfile = async(req,res)=>{
    const userId= req.user.id
    const {userName, userEmail, userPhoneNumber} = req.body
    await User.findByIdAndUpdate(userId,{userName,userEmail,userPhoneNumber},{
        runValidators:true
    })
    res.status(200).json({
        message:"Profile updated"
    })
}

// delete my profile
exports.deleteProfile = async(req,res)=>{
    const userId= req.user.id
    await User.findByIdAndDelete(userId)
    res.status(200).json({
        message:"Profile deleted",
        data:null
    })
}