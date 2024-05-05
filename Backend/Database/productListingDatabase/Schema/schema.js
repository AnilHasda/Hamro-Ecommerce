import { Timestamp } from "mongodb";
import mongoose from "mongoose";
export let schema=new mongoose.Schema({
    item:{
        type:String,
        required:true,
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