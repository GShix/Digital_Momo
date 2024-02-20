const multer = require('multer')

const storage= multer.diskStorage({
    destination: function(req,file,cb){
        //validate mimetype of file
        const allowedFileType = ['image/pmg','image/jpg','image/jpeg']
        if(!allowedFileType.includes(file.mimetype)){
            cb(new Error("This file type is not supported"))
            return 
        }
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + " "+ file.originalname)
    }
})

module.exports = {
    multer,
    storage
}