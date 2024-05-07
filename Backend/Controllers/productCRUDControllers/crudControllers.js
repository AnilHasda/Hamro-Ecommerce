import { ObjectId } from "mongodb";
import { model } from "../../Database/productListingDatabase/Model/model.js";
const updateData=async (req,resp)=>{
console.log(req.body);
let query=await model.updateOne({
    $set:{_id:new ObjectId()}
})
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