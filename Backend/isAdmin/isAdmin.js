import { authModel } from "../Database/authDatabase/model/authModel.js";
import jwt from "jsonwebtoken";
export const isAdmin=async (req,resp)=>{
    let checkAdmin=await authModel.find({isAdmin:true});
    if(checkAdmin.length>0){
        let token=req.cookies.token;
        let decode=jwt.decode(token);
        let userCheck=checkAdmin.filter(ele=>req.body.user || decode.user ===ele.user);
        if(userCheck.length>0){
        return resp.status(200).json({message:"user logged in admin",isLogged:true,isAdmin:true})
        }
        else{
           return resp.status(200).json({message:"user logged in",isLogged:true,isAdmin:false})
        }
    }
    }