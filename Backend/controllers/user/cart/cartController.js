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

exports.getCartItems = async(req,res)=>{
    const userId = req.user.id
    // userData = await User.findById(userId).populate('cart')
    userData = await User.findById(userId).populate({
        path: "cart",
        select:'-productStatus -__v'
    })
    res.status(200).json({
        message:"Cart fetched successfully",
        // data: userData
        data: userData.cart
    })
}

exports.deleteCardItem = async(req,res)=>{
    const userId = req.user.id
    const productId = req.params.id
    const productFound = await Product.findById(productId)
    if(!productFound){
        return res.status(400).json({
            message:"Product not found."
        })
    }
    //get user cart
    const user = await User.findById(userId);
    user.cart = user.cart.filter((pId)=>{pId != productId})
    await user.save();
    res.status(200).json({
        message:"Product Items deleted successfully"
    })

}