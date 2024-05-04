import { authModel } from "../Database/authDatabase/model/authModel.js"
export const isAdmin=async (req,resp,next)=>{
    let user=req.cookies;
    if(user){
    let checkAdmin=await authModel.find({user:"sachu",isAdmin:true});
    if(checkAdmin.length>0){
        next();
    }
    else{
        resp.send("unauthorized access");
    }
    }else{
        resp.send("please login to access")
    }
}