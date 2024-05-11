import express from "express";
import { createCategory, deleteCategory, getCategory, updateCategory } from "../../Controllers/adminCategoryControlers/adminCategory.js";
let router=express.Router();
router.post("/admin/createCategory",createCategory);
router.put("/admin/updateCategory/:id",updateCategory);
router.delete("/admin/deleteCategory/:id",deleteCategory);
router.get("/admin/getCategory",getCategory);
export default router;