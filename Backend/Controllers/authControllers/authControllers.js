import { authModel } from "../../Database/authDatabase/model/authModel.js";
import { isAdmin } from "../../isAdmin/isAdmin.js";
import {
  validationError,
  duplicateErrorHandling,
} from "../../schemaErrorHandling/errorHandling.js";
import { tokenGenerator } from "../../tokenGenerator/tokenGenerator.js";
import bcrptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config("../././.env");
let SECRET_KEY = process.env.SECRET_KEY;
//signup controller function starts from here
const signUp = async (req, resp) => {
  try {
    let query = new authModel(req.body);
    let result = await query.save();
    if (result) {
      let token = tokenGenerator(req.body, SECRET_KEY);
      let expireDate=new Date();
      expireDate.setDate(expireDate.getDate()+7);
      resp.cookie("token", token, { httpOnly: true,expires:expireDate });
      resp.status(200).json({ message: "Your account has been created",isLogged:true });
    } else {
      resp.send("something went wrong! try again later");
    }
  } catch (error) {
    console.log(error)
    if (error.name === "ValidationError") {
      validationError(error, resp);
    } else {
      duplicateErrorHandling(error, resp);
    }
  }
};
//signup controller function ends here
//login controller function starts from here
export const login = async (req, resp) => {
  try {
    console.log(req.body)
    let query = await authModel.find({ user: req.body.user });
    console.log(query)
    if (query.length > 0) {
      let checkPassword = await bcrptjs.compare(
        req.body.password,
        query[0].password
      );
      console.log(checkPassword);
      if (checkPassword) {
        let token = tokenGenerator(req.body, SECRET_KEY);
        resp.cookie("token", token, { httpOnly: true });
       await isAdmin(req,resp);
      } else {
        resp.status(500);
        resp.json({ message: "password doesnot matched" });
      }
    } else {
      resp.status(500);
      resp.json({ message: "username doesnot matched" });
    }
  } catch (error) {
    resp.status(500).json({message:"something went wrong"});
    console.log(error);
  }
};
//login controller function ends here
// logout controller function 
const logout=(req,resp)=>{
  let cookie=req.cookies.token;
  if(cookie){
    let date=new Date(0);
    resp.cookie("token",{expires:date});
  resp.status(200).json({message:"User is logout",isLogged:false,isAdmin:false});
  }else{
    resp.status(200).json({message:"token is not available"});
  }
}
export { signUp,logout };
