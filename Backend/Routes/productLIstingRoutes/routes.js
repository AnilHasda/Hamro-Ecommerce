import express from "express";
const router=express.Router();
import { getData,insertData,filterCategory } from "../../Controllers/productControllers/productControllers.js";
import { data } from "../../multerMiddleware/multer.js";
import { deleteData, updateData } from "../../Controllers/productCRUDControllers/crudControllers.js";
router.get("/product/getData",getData);
router.post("/product/insertData",data,insertData);
router.post("/product/filterCategory",filterCategory);
// router.post("/product/filterPrice",filterByPrice)
router.delete("/product/deleteData/:id",deleteData);
router.put("/product/updateData/:id",data,updateData);
export default router;
