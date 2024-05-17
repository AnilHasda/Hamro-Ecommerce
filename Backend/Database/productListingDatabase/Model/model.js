import mongoose from "mongoose";
import {schema} from "../Schema/schema.js";
export let model=mongoose.model("productlistings",schema);