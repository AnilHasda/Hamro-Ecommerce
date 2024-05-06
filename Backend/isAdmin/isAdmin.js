import { authModel } from "../Database/authDatabase/model/authModel.js"
export const isAdmin=async (req,resp)=>{
    let checkAdmin=await authModel.find({isAdmin:true});
    // if(checkAdmin.length>0){
    //     let userCheck=checkAdmin.filter(ele=>req.body.user===ele.user);
    //     if(userCheck.length>0){
    //         console.log(req.body.user,userCheck);
    //         next();
    //     }
    //     else{
    //         resp.send({message:"unauthorized access! only admin can access this site"});
    //     }
    // }
    // else{
    //     resp.send({message:"something went wrong"});

    // }
    if(checkAdmin.length>0){
        let userCheck=checkAdmin.filter(ele=>req.body.user===ele.user);
        if(userCheck.length>0){
        return resp.status(200).json({message:"user logged in",isLogged:true,isAdmin:true})
        }
        else{
            return resp.status(200).json({message:"user logged in",isLogged:true,isAdmin:false})
        }
    }
    }