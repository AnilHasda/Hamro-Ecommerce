import express from "express";
const router=express.Router();
import { getData,insertData } from "../../Controllers/productControllers/productControllers.js";
import { isLoggin } from "../../isLoggin/isLoggin.js";
import { isAdmin } from "../../isAdmin/isAdmin.js";
router.get("/",isLoggin,isAdmin,getData);
router.post("/product/insertData",insertData);
export default router;
