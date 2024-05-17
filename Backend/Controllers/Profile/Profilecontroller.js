import { authModel } from "../../Database/authDatabase/model/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const ProfileController = async (req, resp) => {
  let token = req.cookies.token;
  let checkToken=jwt.decode(token);
  if(checkToken.user){
  let { user } = checkToken;
  console.log(token);
  let query = await authModel.find({ user });
  console.log(query);
  resp.status(200).json(query);
  }else{
    resp.status(200).json({message:"Invalid token"});
  }
};
const ProfileUpdate = async (req, resp) => {
  let { fname, lname, email, user, phone, password, updatePassword } = req.body;
  let findUser = await authModel.find({ user });
  let initialPassword = findUser[0].password;
  let comparePassword = await bcrypt.compare(password, initialPassword);
  console.log(comparePassword)
  if (comparePassword === true) {
    console.log(comparePassword)
    if (updatePassword === "") {
        let hashedPassword=await bcrypt.hash(password,10);
      let update = await authModel.updateOne({ user }, { $set:{fname,lname,email,user,phone,password: hashedPassword} });
      if (update) {
        resp.status(200).json({ message: "Profile updated successfully" });
      } else {
        console.log("failed ")
        resp.status(500).json({ message: "Failed to update profile" });
      }
    } else {
        let hashedPassword=await bcrypt.hash(updatePassword,10);
        let update = await authModel.updateOne({ user }, { $set: {fname,lname,email,user,phone,password:hashedPassword} });
        if (update) {
          resp.status(200).json({ message: "Profile updated successfully" });
        } else {
            console.log("failed ")
          resp.status(500).json({ message: "Failed to update profile" });
        }
    }
  }else{
    console.log("pass not matched")
    resp.status(500).json({message:"Password does not matched"});
  }
};
export { ProfileController, ProfileUpdate };
