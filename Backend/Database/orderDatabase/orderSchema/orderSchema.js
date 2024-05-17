import mongoose from "mongoose";
export let orderSchema=new mongoose.Schema({
    item:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true,
        default:1
    },
    status:{

    },
    user:{
        type:String,
        required:true
    }
},{timestamps:true})