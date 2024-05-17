import express from "express";
const router=express.Router();
import { getOrder,updateOrder } from "../../Controllers/orderController/orderController.js";
router.get("/Profile/PlaceOrder",getOrder);
router.put("/Admin/Profile/updateOrder",updateOrder);

export default router;