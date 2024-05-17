import { orderModel } from "../../Database/orderDatabase/orderModel/orderModel.js";
import { ObjectId } from "mongodb";
const getOrder=async (req,resp)=>{
    try{
    let query=new orderModel(req.body);
    let result=await query.save();
    if(result){
        resp.status(200).json({message:"Your order has been created"});
    }else{
        resp.status(500).json({message:"something went wrong !"})
    }
    }catch(error){
        resp.status(500).json({message:"internal server error"});
    }
}
// controller for update order status
const updateOrder=async ()=>{
    try{
    let query=await orderModel.updateOne({_id:new ObjectId(req.params.id)});
    if(query){
        resp.status(200).json({message:"data updated successful"});
    }else{
        resp.status(500).json({message:"something went wrong !"})
    }
    }catch(error){
        resp.status(500).json({message:"internal server error"});
    }
}
export {getOrder,updateOrder};