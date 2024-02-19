const Product = require("../../model/productModel")

exports.createProduct = (req,res)=>{
    // console.log(file)
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
    const product = await Product.find({_id:id})
    if(product.length==0){
        res.status(400).json({
            message:"The product with this id is not found"
        })
    }else{
        res.status(200).json({
            message:"Product fetched successfully",
            product
        })
    }
}