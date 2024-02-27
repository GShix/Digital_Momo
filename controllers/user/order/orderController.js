const Order = require("../../../model/orderSchema")

exports.createOrder = async(req,res)=>{
    const userId = req.user.userId
    const {shippingAddress,totalAmount,paymentDetails,items} = req.body
    if(!shippingAddress || !items.length >0 || !totalAmount || !paymentDetails){
        return res.status(400).json({
            message:"Provide shippingAddress, items, totalAmount & payment Details"
        })
    }
    //insert to Order- collection
    await Order.create({
        user: userId,shippingAddress, items, totalAmount, paymentDetails
    })
    res.status(200).json({
        message:"Order created successfully"
    })
}

exports.getMyOrders = async(req,res)=>{
    const userId = req.user.id
    const orders = await Order.find({user:userId}).populate({
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