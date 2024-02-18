const User = require("./model/userModel")
const bcrypt = require('bcryptjs')
exports.adminSeeder = async()=>{
    const adminFound = await User.findOne({userEmail:"admin11@gmail.com"})
    if(!adminFound){
        await User.create({
            userEmail:"admin11@gmail.com",
            userPhoneNumber:"943848744",
            userPassword:bcrypt.hashSync("Admin",10),
            userName:"admin",
            role:"admin"
        })
        console.log("Admin seeded successfully")
    }else{
        console.log("Admin already exists")
    }
}