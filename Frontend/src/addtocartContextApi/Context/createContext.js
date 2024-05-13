import { createContext,useContext } from "react";
let ContextData=createContext();
let useContextData=()=>{
    return useContext(ContextData);
}
export default ContextData;
export {useContextData};