import express from "express";
import { createCategory } from "../../Controllers/adminCategoryControlers/adminCategory.js";
let router=express.Router();
router.post("/admin/createCategory",createCategory);
export default router;