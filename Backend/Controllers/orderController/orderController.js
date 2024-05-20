import mongoose from "mongoose";
import { orderModel } from "../../Database/orderDatabase/orderModel/orderModel.js";
import { ObjectId } from "mongodb";
import { orderSchema } from "../../Database/orderDatabase/orderSchema/orderSchema.js";
const placeMultipleOrder = async (req, resp) => {
  console.log(req.body);
  const { userId, productData } = req.body;
let {productId,quantity}=productData;
  try {
    const query = new orderModel({
      user: userId,
      product:productData.map(product=>({_id:productId,quantity:quantity,Amount:price})),
      TotalAmount: 0,
    });
    const result = await query.save();
    if (result.length>0) {
      console.log("success");
      resp
        .status(200)
        .json({ message: "Your order has been created", order: finalResult });
    } else {
      console.log("wrong");
      resp.status(500).json({ message: "Something went wrong!" });
    }
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Internal server error", error });
  }
};
// controller for single order
const placeSingleOrder=async (req,resp)=>{
  let {userId,productId,quantity,price}=req.body;
  try {
    const query = new orderModel({
      user: userId,
      product:[{_id:productId,quantity:quantity,Amount:price}],
      TotalAmount: price,
    });
    const result = await query.save();
    if (result) {
      console.log("success");
      resp
        .status(200)
        .json({ message: "Your order has been created", order:result});
    } else {
      console.log("wrong");
      resp.status(500).json({ message: "Something went wrong!" });
    }
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Internal server error", error });
  }
}
// this controller is for admin he can update status
const updateOrder = async (req, resp) => {
    console.log(req.body.status);
    console.log(typeof req.params.id)
  try {
    const query = await orderModel.updateOne({
      _id: new ObjectId(req.params.id),
    },{$set:{status:req.body.status}});
    if (query) {
      resp.status(200).json({ message: "Data updated successfully" });
    } else {
      resp.status(500).json({ message: "Something went wrong!" });
    }
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Internal server error", error });
  }
};
// function which retrieve data for user
const userOrder = async (req, resp) => {
console.log(req.params.id);
  try {
    let response = await orderModel.find({user:req.params.id}).populate("user").populate("product._id").exec();
    if (response) {
      resp.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Internal server error" ,error});
  }
};
// get all pending records from user this is for admin 
const getPendingOrder=async (req,resp)=>{
  try {
    let response = await orderModel.find({status:"Pending"}).populate("user").populate("product").exec();
    if (response) {
      resp.status(200).json(response);
    }
  } catch (error) {
    resp.status(500).json({ message: "Internal server error" ,error});
  }
}
// get enum values for admin section
const getEnum=(req,resp)=>{
  let statusValues=orderSchema.path("status").enumValues;
  resp.status(200).json(statusValues);
}
export { placeSingleOrder,placeMultipleOrder, updateOrder, userOrder,getPendingOrder,getEnum };
