const mongoose= require("mongoose");
const Schema = mongoose.Schema

const productSchema = new Schema({
    productName:{
        type: String,
        required: [true,'Enter Product Name']
    },
    productDescription:{
        type: String,
        required: [true,'Enter Product Description']
    },
    productStockQty:{
        type: String,
        required: [true,'Enter Product Stock']
    },
    productPrice:{
        type: String,
        required: [true,'Enter Product Price']
    },
    productStatus:{
        type: String,
        enum:['available','unavailable']
    },
    productImage:String
},{
    timestamps:true
})

const Product = mongoose.model('Product',productSchema);
module.exports = Product