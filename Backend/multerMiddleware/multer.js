import multer from "multer";
let storage=multer.diskStorage({
    destination:function (req,file,cb){
      if(file){
    cb(null,"./productImages");
      }
    },
    filename:function (req,file,cb){
      if(file){
        cb(null,Date.now()+"-"+file.originalname);
      }
    }
})
const imageFilter = function (req, file, cb) {
        // Accept image files only
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
          return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
      };
let data=multer({storage:storage,fileFilter:imageFilter}).single("image");
export {data};