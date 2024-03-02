const { default: axios } = require("axios");
const Order = require("../../../model/orderSchema");

exports.initiateKhaltiPayment = async(req,res)=>{
    const {orderId,amount} = req.body;
    if(!orderId || !amount){
        return res.status(400).json({
            message:"Provide orderId and amount."
        })
    }
    const data ={
        return_url: "http://localhost:4000/api/payment/success",
        purchase_order_id: orderId,
        amount:amount,
        website_url: "http://localhost:4000/",
        purchase_order_name:"orderName_"+ orderId

    }
    const response = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/",data,{
        headers:{
            'Authorization':'key 503d66b404944ee787dd041aff687c5b' 
        }
    })
    console.log(response.data)
    const order = await Order.findById(orderId);
    order.paymentDetails.pidx = response.data.pidx;
    await order.save();
    res.redirect(response.data.payment_url)
}

exports.verifyPidx = async(req,res)=>{
    const pidx = req.query.pidx;
    const response =await axios.post("https://a.khalti.com/api/v2/epayment/lookup/",{pidx},{
        headers:{
            'Authorization':'key 503d66b404944ee787dd041aff687c5b' 
        }
    })
    // console.log(response)
    if(response.data.status =="Completed"){
        //database maa modification
        const order = await Order.find({'paymentDetails.pidx':pidx})
        order[0].paymentDetails.method = "khalti";
        order[0].paymentDetails.status ='paid';
        await order[0].save();
        console.log(order)
        //notify to frontend
        res.redirect("http://localhost:4000")
    }else{
        //notify erro to frontend 
        res.redirect("http://localhost:4000/errorPage")
    }
    res.send(response.data)
}