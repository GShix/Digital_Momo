const Order = require("../../../model/orderSchema")

exports.getMyOrders = async(req,res)=>{
    const userId = req.user.id
    const orders = await Order.find({user:userId}).populate({
        path: "items.product",
        model: "Product"
    })
    res.status(200).json({
        message:"Order fetched successfully",
        data:orders
    })
}