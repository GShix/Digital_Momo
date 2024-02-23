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

exports.deleteUser= async(req,res)=>{
    const {id} = req.params
    if(!id){
        return res.json({
            message:"User not found with this id"
        })
    }
    await User.findByIdAndDelete(id)
    res.status(200).json({
        message:`User with this id ${id} is deleted.`
    })
}

