const Product = require("../../model/productModel")
const Review = require("../../model/reviewModel")

exports.getProducts = async(req,res)=>{
    const products = await Product.find()
    if(products.length ==0){
        res.status(400).json({
            message:"Product is not find",
            products:[]
        })
    }else{
        res.status(200).json({
            message:"Product fetched successfully.",
            products: products
        })
    }
}
//api for single product
exports.getproduct = async(req,res)=>{
    const {id} = req.params
    if(!id){
        return res.json({
            message:"Please provide product id"
        })
    }
    const productReviews = await Review.find({productId:id}).populate('userId')

    const product = await Product.find({_id:id})
    if(product.length==0){
        res.status(400).json({
            message:"The product with this id is not found"
        })
    }else{
        res.status(200).json({
            message:"Product fetched successfully",
            data: product,
            data2:productReviews
        })
    }
}
