import express from "express";
const router=express.Router();
import { getData,insertData } from "../../Controllers/productControllers/productControllers.js";
import { isLoggin } from "../../isLoggin/isLoggin.js";
router.get("/",isLoggin,getData);
router.post("/",insertData);
export default router;
