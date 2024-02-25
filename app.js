const express = require('express');
const app = express();
const { connectDatabase } = require('./database/database');

const authRoute = require('./routes/auth/authRoutes')
const productRoute = require('./routes/admin/productRoutes')
const adminUserRoute = require('./routes/admin/adminUserRoutes')
const userReviewRoute = require('./routes/user/userReviewRoutes')
//Tell to Express to change req to JSON:
app.use(express.json())
app.use(express.urlencoded({extended : true}));

//tell node to give access to upload folder
app.use(express.static('uploads/')) // './uploads'
// './' - give access to all code publically

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
app.use("/api",authRoute);
app.use("/api",productRoute);
app.use("/api",adminUserRoute);
app.use("/api",userReviewRoute);
//Login API

const PORT = process.env.PORT;
// listen server
app.listen(PORT,()=>{
    console.log("Server has started at PORT "+PORT);
})