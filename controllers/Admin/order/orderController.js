const Order = require("../../../model/orderSchema")

exports.getOrders = async(req,res)=>{
    const orders = await Order.find().populate({
        path: "items.product",
        model: "Product"
    })
    if(orders.length ==0){
        return res.status(400).json({
            message:"No orders",
            data:[]
        })
    }
    res.status(200).json({
        message:"Order fetched successfully",
        data:orders
    })
}