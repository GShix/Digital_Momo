const express = require('express');
const app = express();
const { connectDatabase } = require('./database/database');

const authRoute = require('./routes/auth/authRoutes')
const productRoute = require('./routes/admin/productRoutes')
const adminUserRoute = require('./routes/admin/adminUserRoutes')
const userReviewRoute = require('./routes/user/userReviewRoutes')
const profileRoute = require('./routes/user/profileRoute')
const cartRoute = require('./routes/user/cartRoute')
const adminOrdersRoute = require('./routes/admin/adminOrdersRoute')
const orderRoute = require('./routes/user/orderRoute')
const paymentRoute = require('./routes/user/paymentRoute')

//socket
const {Server} = require('socket.io');

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
app.use("/api/auth",authRoute);
app.use("/api/products",productRoute);
app.use("/api/admin/users",adminUserRoute);
app.use("/api/admin/orders",adminOrdersRoute);
app.use("/api/reviews",userReviewRoute);
app.use("/api/profile", profileRoute)
app.use('/api/cart',cartRoute)
// app.use('/api/orders',ordersRoute)
app.use('/api/orders',orderRoute)
app.use('/api/payment',paymentRoute)
//Login API

const PORT = process.env.PORT;
// listen server
 const server = app.listen(PORT,()=>{
    console.log("Server has started at PORT "+ PORT);
})
const io = new Server(server);
io.on('connection',(socket)=>{
    console.log("User Connected")
    socket.on('disconnect',()=>{
        console.log("User disconnected")
    })
})