import dotenv from "dotenv";
dotenv.config(".././.env");
import mongooe from "mongoose";
let url=process.env.URL;
export default function connection(){
 mongooe.connect(url).then(
    (response)=>{console.log("connection successful")})
    .catch((error)=>{
        console.log(error);
    });
}