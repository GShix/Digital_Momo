const User = require("../../../model/userModel")

exports.getUsers = async (req,res)=>{
    const users = await User.find()
    if(users.length >1){
        res.status(200).json({
            message:"Users fetched successfully",
            data: users
        })
    }else{
        res.status(400).json({
            message:"Collection is empty",
            data:[]
        })
    }
}