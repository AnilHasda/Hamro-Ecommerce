import { categorySchema } from "../schema/categorySchema.js";
import mongoose from "mongoose";
export let model=mongoose.model("createCategory",categorySchema);