import mongoose from "mongoose";
import {authSchema} from "../schema/authSchema.js";
export let authModel=mongoose.model("authcollections",authSchema);