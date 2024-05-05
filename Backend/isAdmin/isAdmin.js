import { authModel } from "../Database/authDatabase/model/authModel.js"
export const isAdmin=async (req,resp,next)=>{
    let checkAdmin=await authModel.find({isAdmin:true});
    if(checkAdmin.length>0){
        let userCheck=checkAdmin.filter(ele=>req.user.user===ele.user);
        if(userCheck.length>0){
            console.log(req.user.user,userCheck);
            next();
        }
        else{
            resp.send({message:"unauthorized access! only admin can access this site"});
        }
    }
    else{
        resp.send({message:"something went wrong"});
    }
    }