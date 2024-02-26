const Product = require("../../../model/productModel")
const User = require("../../../model/userModel")

exports.addToCart =async(req,res)=>{
    const userId = req.user.id
    const productId = req.params.id
    if(!productId){
        return res.status(400).json({
            message:"Provide product id"
        })
    }
    const productFound = await Product.findById(productId)
    if(!productFound){
        return res.status(400).json({
            message:"No product with this product id"
        })
    }
    const user = await User.findById(userId)
    user.cart.push(productId)
    await user.save();
    res.status(200).json({
        message:"Product added to cart"
    })
}