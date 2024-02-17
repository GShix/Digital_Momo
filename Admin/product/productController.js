const Product = require("../../model/productModel")

exports.createProduct = (req,res)=>{
    const {productName,productDescription,productStockQty,productPrice,productStatus} = req.body
    if(!productName || !productDescription || !productPrice|| !productStatus || !productStockQty){
        return res.status(400).json({
            message:"Enter your productName,productDescription,productStockQty,productPrice,productStatus"
        })
    }
    //Insert into Product collection
    Product.create({
        productName,
        productDescription,
        productStockQty,
        productPrice,
        productStatus
    })
    res.status(200).json({
        message:"Product created successfully"
    })
}