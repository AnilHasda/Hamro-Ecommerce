import mongoose from "mongoose";
export let schema=new mongoose.Schema({
    item:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    date_of_order:{
        type:Date,
        require:true,
        default:Date.now()
    }
})