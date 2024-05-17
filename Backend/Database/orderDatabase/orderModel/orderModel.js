import mongoose from "mongoose";
import { orderSchema } from "../orderSchema/orderSchema.js";
export let orderModel=mongoose.model("model",orderSchema);