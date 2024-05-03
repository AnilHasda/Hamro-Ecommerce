import express from "express";
import dotenv from "dotenv";
import CookieParser from "cookie-parser";
import router1 from "./Routes/productLIstingRoutes/routes.js"
import router2 from "./Routes/authRoutes/authRoutes.js";
import connection from "./Database/Connection/connection.js";
const app=express();
//connection to database
connection();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
 app.use(CookieParser());
const port=process.env.PORT || 5000;
app.use(router1);
app.use(router2)
app.listen(port,()=>{
    console.log("App is running on port:"+port);
})