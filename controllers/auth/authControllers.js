const jwt= require('jsonwebtoken')
const bcrypt = require('bcryptjs'); 
const User = require('../../model/userModel');

exports.registerUser =async(req,res)=>{
    // console.log(req.body);
    //check all enteries are entered
    const {email,phoneNumber,username,password} = req.body;
    if(!email || !phoneNumber || !password || !username){
        return res.status(400).json({
            message:"Enter Phone,Email & Password.."
        })
    }
    //Check email is already registered or not
    const emailFound = await User.find({userEmail:email})
    if(emailFound.length>0){
        return res.status(400).json({
            message:"This email is already registered."
        })
    }
    //esle
    await User.create({
        userEmail: email,
        userPhoneNumber: phoneNumber,
        userName : username,
        userPassword : bcrypt.hashSync(password,10)
    })
    res.status(201).json({
        message:"User is registered successfully.."
    })

}

exports.loginUser =async(req,res)=>{
    const {email,password}=req.body
    if(!email ||!password){
        return res.status(400).json({
            message:"Enter Email & Password."
        })
    }
    //else
    const userFound = await User.find({userEmail:email})
    if(userFound.length==0){
        return res.status(400).json({
            message:"This email is not registered."
        })
    }
    const matchPassword = bcrypt.compareSync(password,userFound[0].userPassword);
    if(matchPassword){
        const token = jwt.sign({id:userFound._id },process.env.SECRET_KEY,{
            expiresIn:'2d'
        })
        res.status(200).json({
            message:"User logined successfully.",
            token
        })
    }
    else{
        res.status(400).json({
            message:"Invalid Email or Password"
        })
    }
}