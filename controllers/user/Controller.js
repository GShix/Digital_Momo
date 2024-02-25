const Product = require("../../model/productModel")
const Review = require("../../model/reviewModel")

exports.createReview = async(req,res)=>{
    const userId = req.user.id
    const productId = req.params.id
    const {rating, message} = req.body
    if(!userId || !productId || !rating ||!message)
    {
      return res.status(400).json({
            message:"Please provide userId, productId, rating & message"
        })
    }
    //product found or not
    const productFound = await Product.findById(productId)
    if(!productFound){
       return res.status(400).json({
            message:"Product not found"
        })
    }
    await Review.create({
        userId,productId,rating,message
    })
    res.status(200).json({
        message:"Review created successfully"
    })
}
exports.getProductReview = async(req,res)=>{
    const productId = req.params.id
    if(!productId){
        return res.status(400).json({
            message:"Please provid productId"
        })
    }
    const productFound = await Product.findById(productId)
    if(!productFound){
        return res.status(400).json({
            message:"Product with this id doesn't found"
        })
    }
    const reviews = await Review.find({productId})
    res.status(200).json({
        message:"Review fetched successfully",
        data: reviews
    })
    
}
// exports.getMyReview = async(req,res)=>{
//     const userId = req.user.id
//     const reviews = await Review.findById(userId)
//     if(!reviews){
//          res.status(400).json({
//             message:"You have not give a review",
//             reviews:[]
//         })
//     }else{
//         res.status(200).json({
//             message:"Review fetched successfully",
//             data:reviews
//         })
//     }
// }

//Global function may like this
// exports.checkParamsId = (req,res)=>{
//     res.status(400).json({
//         message:"Please provid id "
//     })
// }
exports.deleteReview = async(req,res)=>{
    const reviewId = req.params.id
    if(!reviewId){
        return res.status(400).json({
            message:"Review with this id not found"
        })
    }
    const reviewFound = await Review.findById(reviewId)
    if(!reviewFound){
        return res.status(400).json({
            
        })
    }
    await Review.findByIdAndDelete(reviewId)
    res.status(200).json({
        message: "Review deleted successfully"
    })
}