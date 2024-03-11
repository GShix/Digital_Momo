const Order = require("../../../model/orderSchema")

exports.createOrder = async(req,res)=>{
    const userId = req.user.id
    const {shippingAddress,totalAmount,paymentDetails,items} = req.body
    if(!shippingAddress || !items.length >0 || !totalAmount || !paymentDetails){
        return res.status(400).json({
            message:"Provide shippingAddress, items, totalAmount & payment Details"
        })
    }
    //insert to Order- collection
    await Order.create({
        user: userId,
        shippingAddress, 
        items, 
        totalAmount, 
        paymentDetails
    })
    res.status(200).json({
        message:"Order created successfully"
    })
}

exports.getMyOrders = async(req,res)=>{
    const userId = req.user.id
    const orders = await Order.find({user:userId})//.populate({
    //     path: "item.product",
    //     model: "Product"
    // })
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

exports.updateMyOrder = async(req,res)=>{
    const userId = req.user.id
    const {id} = req.params
    const orderFound = await Order.findById(id)
    if(!orderFound){
        return res.status(400).json({
            messageL:"No order with this id"
        })
    }
    //user authorization
    if(orderFound.user !== userId){
        return res.status(403).json({
            message:"You don't have permission to update this order"
        })
    }
    //order status
    if(orderFound.orderStatus == 'ontheway'){
        return res.status.json({
            message:"You can't update this order"
        })
    }
    const updateOrder = await Order.findByIdAndUpdate(id,req.body,{new:true})
    res.status.json({
        message:"Order updated",
        data:updateOrder
    })
}

exports.deleteMyOrder = async(req,res)=>{
    const userId = req.user.id
    const {id} = req.params
    const orderFound = await Order.findById(id)
    if(!orderFound){
        return res.status(400).json({
            messageL:"No order with this id"
        })
    }
    //user authorization
    if(orderFound.user !== userId){
        return res.status(403).json({
            message:"You don't have permission to delete this order"
        })
    }
    await Order.findByIdAndDelete(id)
    res.status(200).json({
        message:"Order deleted",
        data:null
    })
}

exports.cancelMyOrder = async(req,res)=>{
    const userId = req.user.id
    const {id} = req.params
    const orderFound = await Order.findById(id)
    if(!orderFound){
        return res.status(400).json({
            messageL:"No order with this id"
        })
    }
    //user authorization
    if(orderFound.user !== userId){
        return res.status(403).json({
            message:"You don't have permission to delete this order"
        })
    }
    if(orderFound.orderStatus !=="pending"){
        return res.status(400).json({
            message:"You can't cancel order when order is passed from pending status"
        })
    }
    const updateOrder = await Order.findByIdAndUpdate(id,{orderStatus:"cancelled"})
    res.status(200).json({
        message:"Order cancelled",
        data:updateOrder
    })
}