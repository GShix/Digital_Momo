const mongoose = require('mongoose');
const User = require('../model/userModel');
exports.connectDatabase = async(URI)=>{
    await mongoose.connect(URI)
    console.log("Database is connected successfully");
    const adminFound = await User.findOne({userEmail:"admin11@gmail.com"})
    if(!adminFound){
        await User.create({
            userEmail:"admin11@gmail.com",
            userPhoneNumber:"943848744",
            userPassword:"Admin",
            userName:"admin",
            role:"admin"
        })
        console.log("Admin seeded successfully")
    }else{
        console.log("Admin already exists")
    }
}

