import {model} from "../../Database/productListingDatabase/Model/model.js";
const getData=(req,resp)=>{

    resp.cookie("name","anil",{httpOnly:true})
    resp.send("This is test message for nodejs"+req.user.user);
}
const insertData=async (req,resp)=>{
    console.log(req.body);
    try{
    let query=new model(req.body);
    await query.save();
    console.log("data inserted successful");
    resp.send("data inserted successfully");
    }
    catch(error){
        console.log(error);
        resp.send("failed to insert data");
    }
}
export {getData,insertData};