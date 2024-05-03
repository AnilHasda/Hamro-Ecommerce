import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config("../.env");
const isLoggin=(req,resp,next)=>{
    let token=req.cookies.token;
    if(!token){
        resp.send("please loggin to continue");
    }
    else{
        try{
        let check=jwt.verify(token,process.env.SECRET_KEY);
        if(check){
            next();
        }
        else{
            resp.send("something went wrong! try again later");
        }
        }
        catch(error){
            resp.send("unauthorized access");
        }
    }
}
export {isLoggin};