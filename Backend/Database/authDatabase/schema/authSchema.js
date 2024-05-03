import mongoose from "mongoose";
import {encodePassword} from "../encodePassword/encode.js";
export let authSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    user:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    data_0f_registration:{
        type:Date,
        default:Date.now()
    }

})
authSchema.pre("save",async function (next){
await encodePassword(this,next);
})
