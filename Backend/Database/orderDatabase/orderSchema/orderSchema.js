import mongoose from "mongoose";
export let orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "authcollections" },
    product: [
      {
        _id: {type: mongoose.Schema.Types.ObjectId, ref: "productlistings" },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        Amount: {
          type: Number,
          required: true,
        },
      },
    ],
    TotalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  { timestamps: true }
);
