const User = require("../../../model/userModel")
const bcrypt = require('bcryptjs')

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

//update password
exports.updatePassword = async(req,res)=>{
    const userId = req.user.id
    const {oldPassword, confirmPassword, newPassword} = req.body
    if(!oldPassword || !confirmPassword || !newPassword){
        return res.status(200).json({
            message:"Enter your old Password, newPassword & confirmPassword"
        })
    }
    if(newPassword !== confirmPassword){
        return res.status(200).json({
            message:"Your password doesn't match"
        })
    }
    const userData = await User.findById(userId)
    const hashedOldPass = userData.userPassword
    const isOldPasswordCorrect = bcrypt.compareSync(oldPassword,hashedOldPass)
    if(!isOldPasswordCorrect){
        return res.status(400).json({
            message:"You don't have permission"
        })
    }
    userData.userPassword = bcrypt.hashSync(newPassword,12)
    await userData.save()
    res.status(200).json({
        message:"Password Updated"
    })
}