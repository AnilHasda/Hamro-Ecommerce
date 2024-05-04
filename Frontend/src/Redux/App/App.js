import {configureStore} from "@reduxjs/toolkit";
import reducer from "../Slices/Slices.js";
let Store=configureStore({
    reducer
})
export default Store;