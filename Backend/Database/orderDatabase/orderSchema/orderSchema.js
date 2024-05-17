import mongoose from "mongoose";
export let orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "authcollections" },
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: "productlistings" }],
    quantity: {
      type: String,
      required: true,
      default: 1,
    },
    price:{
      type:String,
      required:true
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Out for Delivery", "Delivered","Cancelled"],
      default:"Pending"
    },
  },
  { timestamps: true }
);
