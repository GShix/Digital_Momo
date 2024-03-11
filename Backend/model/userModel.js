const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userEmail:{
        type: String,
        required:[true,'Email must be provided'],
        unique:true,
        lowercase:true //email must be in lowercase
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
    },
    otp:{
        type:Number
    },
    isOtpVerified:{
        type: Boolean,
        default: false
    },
    cart:[{type:Schema.Types.ObjectId,ref:"Product"}]
},{
        timestamps:true
})


const User =mongoose.model('User', userSchema)
module.exports = User;