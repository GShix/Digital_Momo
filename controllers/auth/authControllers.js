const jwt= require('jsonwebtoken')
const bcrypt = require('bcryptjs'); 
const User = require('../../model/userModel');
const sendEmail = require('../../services/sendEmail');

exports.registerUser =async(req,res)=>{
    // console.log(req.body);
    //check all enteries are entered
    const {email,phoneNumber,username,password} = req.body;
    if(!email || !phoneNumber || !password || !username){
        return res.status(400).json({
            message:"Enter Phone,Email,Username & Password.."
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

exports.forgotPassword = async(req,res)=>{
    const {email} = req.body
    if(!email){
        return res.status(400).json({
            message:"Enter an email"
        })
    }
    const userFound = await User.find({userEmail:email})
    if(userFound.length==0){
        return res.status(400).json({
            message:"This email is not registered"
        })
    }

    //generate otp
    const otp= Math.floor(Math.random() *10000);
    userFound[0].otp = otp;
    await userFound[0].save();
    await sendEmail({
        email: email,
        subject:"OTP for your new Password",
        message: `Your OTP for Digital Mo:Mo is ${otp}`
    })
    res.status(200).json({
        message:"Email sent successfully"
    })
}

exports.verifyOtp = async(req,res)=>{
    const {email, otp} = req.body
    if(!email || !otp){
        return res.status(400).json({
            message:"Enter an email and otp"
        })
    }
    const userFound = await User.find({userEmail:email})
    if(userFound.length==0){
        return res.status(400).json({
            message:"This email is not registered"
        })
    }
    if(userFound[0].otp !=otp){
         res.status(400).json({
            message:"Invalid OTP"
        })
    }else{
        res.status(200).json({
            message:"Your OTP is Valid"
        })
    }
    
}