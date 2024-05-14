import { useContextData } from "../../addtocartContextApi/Context/createContext";
const useRemoveItems=()=>{
    let {cartData,getData}=useContextData();
   return  function removeLocal(id){
    let filterData=cartData.filter(ele=>ele.id!==id);
    console.log(filterData);
    localStorage.setItem("cartData",JSON.stringify(filterData));
    getData();
    }
}
export default useRemoveItems;