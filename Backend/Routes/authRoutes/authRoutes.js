import express from "express";
const router=express.Router();
import { signUp,login} from "../../Controllers/authControllers/authControllers.js";
import { isAdmin } from "../../isAdmin/isAdmin.js";
router.post("/auth/signup",signUp);
router.post("/auth/login",login);
export default router;