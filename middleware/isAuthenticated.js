const isAuthenticated = (req,res,next) =>{
    const token = req.headers.authorization
    console.log(token)
    return 
    //next 
}

module.exports = isAuthenticated