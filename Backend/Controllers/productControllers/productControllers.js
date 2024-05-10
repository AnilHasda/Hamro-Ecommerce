import { query } from "express";
import { model } from "../../Database/productListingDatabase/Model/model.js";
import {
  validationError,
  duplicateErrorHandling,
} from "../../schemaErrorHandling/errorHandling.js";
const getData = async (req, resp) => {
 let query=await model.find();
 resp.status(200).json(query);
};
const insertData = async (req, resp) => {
  console.log(req.file);
  console.log(req.body);
  try {
    let query = new model({...req.body,item:req.file.filename});
    await query.save();
    if (query) {
      resp.status(200).json({ message: "New item has been added" });
    } else {
      resp.send({ message: "something went wrong! try again later" });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      validationError(error, resp);
    } else {
      duplicateErrorHandling(error, resp);
    }
  }
};
//controller for filter by category
const filterCategory=async (req,resp)=>{
console.log(req.body);
let query;
let [lowerPrice,higherPrice]=req.body.selectPrice;
try{
  if(req.body.selectPrice && req.body.selectCategory){
    console.log("both provided")
query=await model.find({
  $and:[
  {category:req.body.selectCategory},
  {price:{$lte:Number(higherPrice),$gte:Number(lowerPrice)}}
  ]
});
  }else if(req.body.selectPrice && !req.body.selectCategory){
    console.log("only price provided")
    query=await model.find({price:{$lte:Number(higherPrice),$gte:Number(lowerPrice)}});
  }
  else{
    console.log("only category provided")
    query=await model.find({category:req.body.selectCategory});
  }
if(query){
  console.log(query);
  resp.send(query);
}
else{
  resp.status(500).json({message:"something went wrong"});
}
}catch(error){
  console.log(error)
  resp.status(500).json({message:"Internal server error"});
}
}
//controller for filter by price
// const filterByPrice=async (req,resp)=>{
//   console.log(req.body);
//   try{
//   let query=await model.find({price:{$gte:Number(req.body.lowerPrice),$lte:Number(req.body.higherPrice)}});
//   if(query){
//     resp.status(200).json(query);
//   }else{
//     resp.status(500).json({message:"something went wrong"});
//   }
//   }catch(error){
//     console.log(error);
//     resp.status(500).json({message:error});
//   }
// }

//search controller function
export { getData, insertData,filterCategory };
