const Product = require("../../../model/productModel")
const fs = require('fs')
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

//DELETE API
exports.deleteProduct =async(req,res)=>{
    const {id} = req.params
    if(!id){
        return res.json({
            message:"Please provide product id"
        })
    }
    //productImage delete garna lai
    const oldData = await Product.findById(id)
    const oldProductImage = oldData.productImage
    fs.unlink('./uploads/' + oldProductImage,(err)=>{
        if(err){
                console.log("Error deleting file",err)
        }else{
            console.log("File Deleted")
        }
    })

    //Delete Product
    await Product.findByIdAndDelete(id)
    res.status(200).json({
        message:"Product is deleted"
    })
}

//Edit API
exports.editProduct = async(req,res)=>{
    //file hataunko laagi
    // fs.unlink('./uploads/1708620098706-Roadmap MongoDb.pdf', (err)=>{
    //     if(err){
    //         console.log("Error occured",err)
    //     }else{
    //         console.log("File deleted")
    //     }
    // })
    const {id} = req.params 
    const {productName,productDescription,productPrice,productStatus,productStockQty} = req.body
    // console.log(req.body)
    // return
    if(!productName || !productDescription || !productPrice || !productStatus || !productStockQty || !id){
      return res.status(400).json({
          message : "Please provide productName,productDescription,productPrice,productStatus,productStockQty,id"
      })
  }
  const oldData = await Product.findById(id)
  if(!oldData){
      return res.status(404).json({
          message : "No data found with that id"
      })
  }

  const oldProductImage = oldData.productImage 
  if(req.file && req.file.filename){
      // REMOVE FILE FROM UPLOADS FOLDER
          fs.unlink("./uploads/" +  oldProductImage,(err)=>{
              if(err){
                  console.log("error deleting file",err) 
              }else{
                  console.log("file deleted successfully")
              }
          })
  }
 const datas =  await Product.findByIdAndUpdate(id,{
      productName ,
      productDescription ,
      productPrice,
      productStatus,
      productStockQty,
      productImage : req.file && req.file.filename ? req.file.filename :  oldProductImage
  },{
      new : true,
  
  })
  res.status(200).json({
      messagee : "Product updated successfully",
      data : datas
  })
}

