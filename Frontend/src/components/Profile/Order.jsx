import React,{useEffect,useState} from "react";
import ProfieNavigation from "./ProfieNavigation";
import axios from "axios";
const Order = () => {
  let [orderData,setOrderData]=useState([]);
  //function for retrieving user data
  let userId;
  async function userData() {
    try {
      let { data } = await axios.get("http://localhost:4000/Profile", {
        withCredentials: true,
      });
      userId = data[0]._id;
      getOrderData();
    } catch (error) {
      console.log(error);
    }
  }
    // function to retrieve order record for user 
    async function getOrderData(){
      try {
        let { data } = await axios.get("http://localhost:4000/Profile/userOrder/"+userId, {
          withCredentials: true,
        });
      console.log(data);
      setOrderData(data);
      } catch (error) {
        console.log(error);
      }
    }
  useEffect(() => {
    userData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-5">
      <ProfieNavigation />
      <div className="w-full md:flex-1 overflow-x-scroll pt-10">
        <h3 className="text-md font-bold text-center pb-2">Your Order Status</h3>
        <table className="w-full md:w-full text-center">
          <thead>
            <tr className="px-4 h-10"><td>S.N</td><td>Item</td><td>Price</td><td>Status</td><td>Time of Order</td></tr>
          </thead>
          <tbody>
        {orderData.map((ele,index)=>{
          return <tr key={ele.key} className="px-4 h-10">
            <td>{index+1}</td>
            <td>{ele.product[0].name}</td>
            <td>{ele.price}</td>
            <td>{ele.status}</td>
            <td>{ele.createdAt}</td>
          </tr>
        })}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
