import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getData,loadingStatus,filterData,updateLogged, addCategory} from "../../Redux/Slices/Slices";
const GetData = () => {
  let dispatch = useDispatch();
  //function to get all product data
  const fetchData = async () => {
    try {
      dispatch(loadingStatus(true));
      let response = await axios.get("http://localhost:4000/product/getData");
      dispatch(getData(response.data));
      dispatch(filterData(response.data))
    } catch (error) {
      console.log(error);
    }finally{
      dispatch(loadingStatus(false));
    }
  };

  //function to fetch loggin info
  const fetchLoggedInfo=async ()=>{
    try{
      let loggedInfo=await axios.get("http://localhost:4000/auth/loggedInfo",{withCredentials:true});
if(loggedInfo?.data){
  dispatch(updateLogged({isLogged:loggedInfo.data.isLogged,isAdmin:loggedInfo.data.isAdmin || false}));
}
    }catch(error){
      console.log({loggedError:error});
    }
  }
  //funtion to fetch all the category
  const fetchCategory=async ()=>{
    try{
    let {data}=await axios.get("http://localhost:4000/admin/getCategory");
    dispatch(addCategory(data));
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
    fetchLoggedInfo();
    fetchCategory();
  }, []);
  return {fetchData,fetchLoggedInfo,fetchCategory};
};
export default GetData;
