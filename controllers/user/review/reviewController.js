const Product = require("../../../model/productModel")
const Review = require("../../../model/reviewModel")

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

exports.getMyReview = async(req,res)=>{
    const userId = req.user.id
    const reviews = await Review.find({userId})
    if(reviews.length==0){
         res.status(400).json({
            message:"You have not give a review",
            data:[]
        })
    }else{
        res.status(200).json({
            message:"Review fetched successfully",
            data:reviews
        })
    }
}

// Global function may like this
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

    //authorizating user
    const userId = req.user.id
    const reviewFound = await Review.findById(reviewId)
    const reviewOwnerId = reviewFound.userId
    if(!reviewOwnerId !==userId){
        return res.status(403).json({
            message:"You don't have permission to delete this review."
        })
    }
    if(!reviewFound){
        return res.status(400).json({
            
        })
    }
    await Review.findByIdAndDelete(reviewId)
    res.status(200).json({
        message: "Review deleted successfully"
    })
}