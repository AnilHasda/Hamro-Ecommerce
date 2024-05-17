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
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }

},{timestamps:true})
authSchema.pre("save",async function (next){
await encodePassword(this,next);
})
