import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config("../.env");
const isLoggin=(req,resp,next)=>{
    let token=req.cookies.token;
    if(!token){
        resp.status(200).json({message:"please loggin to continue",isLogged:false});
    }
    else{                   
        try{
        let check=jwt.verify(token,process.env.SECRET_KEY);
        if(check){
            req.user=check;
            next();
        }
        else{
            resp.status(500).json({message:"something went wrong! try again later"});
        }
        }
        catch(error){
            resp.status(200).json({message:"unauthorized access"});
        }
    }
}
export {isLoggin};