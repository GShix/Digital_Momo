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
exports.getSingleOrder = async(req,res)=>{
    const {id} = req.params
    const orderFound = await Order.findById(id)
    if(!orderFound){
        return res.status(400).json({
            messageL:"No order with this id"
        })
    }
    res.status(200).json({
        message:"Order fetched",
        data:orderFound
    })
}

exports.updateOrder = async(req,res)=>{
    const {id} = req.params
    const {orderStatus} = req.body
    const orderFound = await Order.findById(id)
    if(!orderFound ){
        return res.status(400).json({
            messageL:"No order with this id"
        })
    }
    if(! orderStatus || !['pending','confirmed','cancelled','ontheway','preparation','delivered'].includes(orderStatus.toLowerCase())){
        return res.status(400).json({
            message:"Invalid Order Status"
        })
    }
    const updateOrder = await Order.findByIdAndUpdate(id,{
        orderStatus
    },{new:true})
    res.status(200).json({
        message:"Order updated",
        data:updateOrder
    })
}

exports.deleteOrder = async(req,res)=>{
    const {id} = req.params
    const orderFound = await Order.findById(id)
    if(!orderFound){
        return res.status(400).json({
            messageL:"No order with this id"
        })
    }
    await Order.findByIdAndDelete(id);
    res.status(200).json({
        message:"Order deleted"
    })
}