import { ObjectId } from "mongodb";
import { model } from "../../Database/productListingDatabase/Model/model.js";
const updateData=async (req,resp)=>{
console.log(req.body);
try{
let query=await model.updateOne(
{_id:new ObjectId(req.params.id)},
{$set:req.file?{...req.body,item:req.file.filename}:req.body});
if(query){
    resp.status(200).json({message:"data updated successful"});
}else{
    resp.status(500).json({message:"Failed to update data"});
}
}catch(error){
    console.log(error);
    resp.status(500).json({message:"something went wrong"});
}

}
const deleteData=async (req,resp)=>{
    console.log(req.params.id);
    try{
    let query=await model.deleteOne({_id:new ObjectId(req.params.id)});
    if(query){
        resp.status(200).json({message:"data deleted successfully"});
    }else{
        resp.status(500).json({message:"error occur while deleting data"});
    }
    }catch(error){
        console.log(error);
        resp.status(500).json({message:"something went wrong"});
    }
}
export {updateData,deleteData};