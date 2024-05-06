import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import CookieParser from "cookie-parser";
import router1 from "./Routes/productLIstingRoutes/routes.js"
import router2 from "./Routes/authRoutes/authRoutes.js";
import connection from "./Database/Connection/connection.js";
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';

// Get the current module's URL
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module
const __dirname = dirname(__filename);
const app=express();
//connection to database
connection();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
 app.use(CookieParser());
 app.use(express.static(path.join(__dirname,"productImages")));
 app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
 }));
const port=process.env.PORT || 5000;
app.use(router1);
app.use(router2)
app.listen(port,()=>{
    console.log("App is running on port:"+port);
})