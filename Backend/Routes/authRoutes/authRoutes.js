import express from "express";
const router=express.Router();
import { signUp,login} from "../../Controllers/authControllers/authControllers.js";
import { isLoggin } from "../../isLoggin/isLoggin.js";
import { isAdmin } from "../../isAdmin/isAdmin.js";
router.post("/auth/signup",signUp);
router.post("/auth/login",login);
router.get("/auth/loggedInfo",isLoggin,isAdmin);
export default router;