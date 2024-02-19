module.exports = (fun)=>{
    return (req,res,next)=>{
        fun(req,res,next).catch((err)=>{
             return res.status(500).json({
                message:err.message,
                fullError: err
            })
        })
    }
}