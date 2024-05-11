import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getData,loadingStatus,filterData,updateLogged} from "../../Redux/Slices/Slices";
const GetData = () => {
  let dispatch = useDispatch();
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
  const fetchLoggedInfo=async ()=>{
    try{
      let loggedInfo=await axios.get("http://localhost:4000/auth/loggedInfo",{withCredentials:true});
if(loggedInfo?.data){
  console.log(loggedInfo.data)
  dispatch(updateLogged({isLogged:loggedInfo.data.isLogged,isAdmin:loggedInfo.data.isAdmin}));
}
    }catch(error){
      console.log({loggedError:error});
    }
  }
  useEffect(() => {
    fetchData();
    fetchLoggedInfo();
  }, []);
  return {fetchData,fetchLoggedInfo};
};
export default GetData;
