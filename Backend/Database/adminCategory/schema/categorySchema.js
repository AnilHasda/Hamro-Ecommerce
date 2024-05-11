import mongoose from "mongoose";
let categorySchema=new mongoose.Schema({
    category:{
        type:String,
        required:true,
        unique:true
    }
})
export {categorySchema};