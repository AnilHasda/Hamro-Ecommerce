
import mongoose from "mongoose";
export let schema=new mongoose.Schema({
    item:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
},{timestamps:true})