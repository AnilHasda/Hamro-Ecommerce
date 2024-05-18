import express from "express";
const router=express.Router();
import { getOrder,updateOrder,userOrder,getPendingOrder,getEnum } from "../../Controllers/orderController/orderController.js";
router.post("/Profile/PlaceOrder",getOrder);
router.put("/Admin/Profile/updateOrder/:id",updateOrder);
router.get("/Profile/userOrder/:id",userOrder);
router.get("/Admin/Profile/PendingOrder",getPendingOrder);
router.get("/Admin/Profile/statusValues",getEnum);
export default router;