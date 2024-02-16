const express = require('express');
const { connectDatabase } = require('./database/database');
const User = require('./model/userModel');
const app = express();
// const { registerUser, loginUser } = require('./controllers/auth/authControllers');

const jwt= require('jsonwebtoken')
const bcrypt = require('bcryptjs'); 

//Tell to Express to change req to JSON:
app.use(express.json())
app.use(express.urlencoded({extended : true}));

//Invoking dotenv(Telling nodejs to use .env)
require('dotenv').config(); 

//Database connection
connectDatabase(process.env.MONGO_URI); //connectDatabase();

//Test API(server is live or not)
app.get('/',(req,res)=>{
    res.status(200).json({
        message:"This is Home Page."
    })
})

//Register API
app.post('/register',async(req,res)=>{
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

})
//Login API
app.post('/login',async(req,res)=>{
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
})

const PORT = process.env.PORT;
// listen server
app.listen(PORT,()=>{
    console.log("Server has started at PORT "+PORT);
})