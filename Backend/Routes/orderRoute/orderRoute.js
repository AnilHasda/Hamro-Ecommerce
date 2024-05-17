import express from "express";
const router=express.Router();
import { getOrder,updateOrder,userOrder } from "../../Controllers/orderController/orderController.js";
router.post("/Profile/PlaceOrder",getOrder);
router.put("/Admin/Profile/updateOrder",updateOrder);
router.get("/Profile/userOrder/:id",userOrder);
export default router;