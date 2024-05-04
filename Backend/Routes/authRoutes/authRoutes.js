import express from "express";
const router=express.Router();
import { signUp,login} from "../../Controllers/authControllers/authControllers.js";
router.post("/auth/signup",signUp);
router.post("/auth/login",login);
export default router;