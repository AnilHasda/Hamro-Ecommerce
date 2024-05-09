import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getData } from "../../Redux/Slices/Slices";
const GetData = () => {
  let dispatch = useDispatch();
  const fetchData = async () => {
    try {
      let response = await axios.get("http://localhost:4000/product/getData");
      dispatch(getData(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return fetchData;
};
export default GetData;
