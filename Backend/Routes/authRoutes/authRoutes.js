import express from "express";
const router=express.Router();
import { signUp } from "../../Controllers/authControllers/authControllers.js";
router.post("/signup",signUp);
export default router;