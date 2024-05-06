import { model } from "../../Database/productListingDatabase/Model/model.js";
import {
  validationError,
  duplicateErrorHandling,
} from "../../schemaErrorHandling/errorHandling.js";
const getData = async (req, resp) => {
 let query=await model.find();
 resp.status(200).json(query);
};
const insertData = async (req, resp) => {
  console.log(req.file);
  console.log(req.body);
  try {
    let query = new model({...req.body,item:req.file.filename});
    await query.save();
    if (query) {
      resp.status(200).json({ message: "New item has been added" });
    } else {
      resp.send({ message: "something went wrong! try again later" });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      validationError(error, resp);
    } else {
      duplicateErrorHandling(error, resp);
    }
  }
};
export { getData, insertData };
