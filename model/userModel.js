const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userEmail:{
        type: String,
        required:[true,'Email must be provided']
    },
    userPhoneNumber:{
        type: Number,
        required:[true,'Phone must be entered']
    },
    userName:{
        type: String,
        required: [true,"Username can't be empty"]
    },
    userPassword:{
        type: String,
        required:[true,"Password can't be empty"]
    },
    role:{
        type:String,
        enum:['customer','admin'],
        default: "customer"
    }
})


const User =mongoose.model('User', userSchema)
module.exports = User;