import multer from "multer";
let storage=multer.diskStorage({
    destination:function (req,file,cb){
    cb(null,"./upload");
    },
    filename:function (req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    }
})
let data=multer({storage:storage}).single("image");
export {data};