import express from "express";
const router=express.Router();
import { getData,insertData } from "../../Controllers/productControllers/productControllers.js";
import { isLoggin } from "../../isLoggin/isLoggin.js";
import { isAdmin } from "../../isAdmin/isAdmin.js";
router.get("/",isAdmin,getData);
router.post("/",insertData);
export default router;
