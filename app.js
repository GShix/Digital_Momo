const express = require('express');
const app = express();
const { connectDatabase } = require('./database/database');

const authRoute = require('./routes/authRoutes')
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
app.use("",authRoute);
//Login API

const PORT = process.env.PORT;
// listen server
app.listen(PORT,()=>{
    console.log("Server has started at PORT "+PORT);
})