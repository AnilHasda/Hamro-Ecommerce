//Admin createCategory controllers
import {model} from "../../Database/adminCategory/Model/categoryModle.js";
import { validationError,duplicateErrorHandling } from "../../schemaErrorHandling/errorHandling.js";
//category inserted controller
const createCategory=async (req,resp)=>{
    console.log(req.body);
    try{
    let query=new model(req.body);
    let result=await query.save();
    if(result){
        resp.status(200).json({message:"data inserted successfully"});
    }
    }catch(error){
        if (error.name === "ValidationError") {
            validationError(error, resp);
          } else {
            duplicateErrorHandling(error, resp);
          }
    }
}
export {createCategory};