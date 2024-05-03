import { authModel } from "../../Database/authDatabase/model/authModel.js";
import {
  validationError,
  duplicateErrorHandling,
} from "../../schemaErrorHandling/errorHandling.js";
import { tokenGenerator } from "../../tokenGenerator/tokenGenerator.js";
import dotenv from "dotenv";
dotenv.config("../././.env");
let SECRET_KEY=process.env.SECRET_KEY;
//signup controller function starts from here
const signUp = async (req, resp) => {
  try {
    let query = new authModel(req.body);
    let result = await query.save();
    if(result){
      let token = tokenGenerator(req.body, SECRET_KEY);
      resp.cookie("token",token,{httpOnly:true});
      resp.send("Your account has been created");
    }
    else{
        resp.send("something went wrong! try again later");
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      validationError(error, resp);
    } else {
      duplicateErrorHandling(error, resp);
    }
  }
};
//signup controller function ends here
export { signUp };
