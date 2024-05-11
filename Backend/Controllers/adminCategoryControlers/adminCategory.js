//Admin createCategory controllers
import { ObjectId } from "mongodb";
import {model} from "../../Database/adminCategory/Model/categoryModle.js";
import { validationError,duplicateErrorHandling } from "../../schemaErrorHandling/errorHandling.js";
//show all the category
const getCategory=async (req,resp)=>{
  try{
  let query=await model.find();
  if(query.length>0){
    resp.status(200).json(query);
  }
  else{
    resp.status(200).json({message:"data is not present"});
  }
  }catch(error){
    console.log(error);
    resp.status(500).json({message:"Internal server error"})
  }
}
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
//update controller
const updateCategory=async (req,resp)=>{
  let id=req.params.id;
  try{
  let query=await model.updateOne({_id:new ObjectId(id)},{$set:{category:req.body.category}});
  if(query){
    resp.status(200).json({message:"Data updated successfully"});
  }
  else{
resp.status(500).json({message:"Something went wrong"});
  }
}catch(error){
  console.log(error)
  resp.status(500).json({message:"Internal server error"});
}
}
const deleteCategory=async (req,resp)=>{
  let id=req.params.id;
  try{
  let query=await model.deleteOne({_id:new ObjectId(id)})
  if(query){
    resp.status(200).json({message:"Data deleted successfully"});
  }
  else{
resp.status(500).json({message:"Something went wrong"});
  }
  }catch(error){
    console.log(error)
  resp.status(500).json({message:"Internal server error"});
  }
}
export {createCategory,updateCategory,deleteCategory,getCategory};