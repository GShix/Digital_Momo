const mongoose = require('mongoose');
exports.connectDatabase = async(URI)=>{
    await mongoose.connect(URI)
    console.log("Database is connected successfully");
}