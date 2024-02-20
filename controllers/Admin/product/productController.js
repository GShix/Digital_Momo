const Product = require("../../../model/productModel")

exports.createProduct = (req,res)=>{
    // console.log(req.user)
    // return
   const file = req.file
   let filePath 
   if(!file){
    filePath = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fpisces.bbystatic.com%2Fimage2%2FBestBuy_US%2Fimages%2Fproducts%2F6409%2F6409982_sd.jpg%3BmaxHeight%3D640%3BmaxWidth%3D550&tbnid=zPWW0sVovM0igM&vet=12ahUKEwi5n4rNxLqEAxXobWwGHRP8AQEQMygAegQIARB0..i&imgrefurl=https%3A%2F%2Fwww.nepal.ubuy.com%2Fen%2Fproduct%2F1A2TCU5UK-canon-eos-rp-mirrorless-camera-with-rf-24-105mm-f-4-7-1-is-stm-lens&docid=eFdlE_WV_m8XvM&w=550&h=457&q=camera&ved=2ahUKEwi5n4rNxLqEAxXobWwGHRP8AQEQMygAegQIARB0"
   }
   else{
    filePath = req.file.filename
   } 
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
            productStatus,
            productImage: filePath
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