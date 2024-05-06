import axios from "axios";
import { useEffect, useState } from "react";
const useGetData =() => {
    let [data,setData]=useState([]);
  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get("http://localhost:4000/product/getData");
        setData(response.data)
      } catch (error) {
        console.log(error);
      }
    })();
  },[]);
  return data;
};
export default useGetData;
