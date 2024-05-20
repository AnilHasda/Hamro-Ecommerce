import React, { useEffect, useState } from "react";
import ProfieNavigation from "./ProfieNavigation";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const Order = () => {
  let [orderData, setOrderData] = useState([]);
  let [pendingOrders, setPendingOrders] = useState([]);
  let [enumData, setEnumData] = useState([]);
  //function for retrieving user data
  let isLogged = useSelector((state) => state.isLogged.status);
  let isAdmin = useSelector((state) => state.isAdmin.status);
  console.log({ loggedinfo: isLogged, isAdminstatus: isAdmin });
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
  async function getOrderData() {
    try {
      let { data } = await axios.get(
        "http://localhost:4000/Profile/userOrder/" + userId,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setOrderData(data);
    } catch (error) {
      console.log(error);
    }
  }
  // getPending orders function for admin
  const getPendingOrder = async () => {
    try {
      let { data } = await axios.get(
        "http://localhost:4000/Admin/Profile/PendingOrder",
        { withCredentials: true }
      );
      setPendingOrders(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  //  get enum values for updating status  this will show for  admin only
  const getEnum = async () => {
    try {
      let response = await axios.get(
        "http://localhost:4000/Admin/Profile/statusValues",
        { withCredentials: true }
      );
      setEnumData(response?.data);
      console.log({enumdatas:response.data});
    } catch (error) {
      console.log(error);
    }
  };
  // function for updating order status (admin section)
  const updateOrderStatus=async (id,status)=>{
    try{
let {data}=await axios.put("http://localhost:4000/Admin/Profile/updateOrder/"+id,{status},{withCredentials:true});
toast.success(data.message);
getPendingOrder();
    }catch(error){
      toast.error("Failed to update Status");
    }
  }
  useEffect(() => {
    if (isAdmin === false) {
      console.log("function is called ");
      userData();
    } else {
      getPendingOrder();
    }
    getEnum();
  }, [isAdmin]);

  return (
    <>
      {isLogged === true ? (
        <div className="flex flex-col md:flex-row gap-5">
          <ProfieNavigation />
          <div className="md:flex-1 overflow-hidden">
            <h3 className="text-md font-bold text-center pt-10 pb-4">
              {isAdmin === false ? "Your Order Status" : "Users Order Status"}
            </h3>
            <div className="w-[full] overflow-x-scroll">
              {isAdmin === false ? (
                <table className="w-[700px] md:w-full text-center">
                  <thead>
                    <tr className="px-4 h-10">
                      <td>S.N</td>
                      <td>Image</td>
                      <td>Name</td>
                      <td>Price</td>
                      <td>Quantity</td>
                      <td>Status</td>
                      <td>Time of Order</td>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.map((ele, index) => {
                      return (
                        <tr key={ele._id} className="px-4 h-10">
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={
                                "http://localhost:4000/" + ele?.product[0]._id.item
                              }
                              alt={ele?.product[0]?._id.name}
                              className="w-[50px]"
                            />
                          </td>
                          <td>{ele?.product[0]?._id.name}</td>
                          <td>{ele?.product[0].Amount}</td>
                          <td>{ele?.product[0].quantity}</td>
                          <td>{ele?.status}</td>
                          <td>{ele?.createdAt}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <table className="w-[1000px] lg:w-full text-center">
                  <thead>
                    <tr className="px-4 h-10">
                      <td>S.N</td>
                      <td>Image</td>
                      <td>User</td>
                      <td>Contact</td>
                      <td>Item</td>
                      <td>Price</td>
                      <td>Status</td>
                      <td>Location</td>
                      <td>Time of Order</td>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingOrders.map((ele, index) => {
                      return (
                        <tr key={ele._id} className="px-4 h-10">
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={
                                "http://localhost:4000/" + ele?.product[0]?.item
                              }
                              alt={ele?.product[0]?.name}
                              className="w-[50px]"
                            />
                          </td>
                          <td>{ele.user.user}</td>
                          <td>{ele.user.phone}</td>
                          <td>{ele?.product[0]?.name}</td>
                          <td>{ele?.price}</td>
                          <td>
                            <select onChange={(e)=>{updateOrderStatus(ele._id,e.target.value)}}>
                              {enumData?.map((ele,index)=>{
                               return <option key={index} value={ele} defaultValue={ele}>{ele}</option>
                              })}
                            </select>
                            </td>
                          <td>Biratnagar</td>
                          <td>{ele?.createdAt}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center font-bold text-md pt-4">
          Please login to continue
        </p>
      )}
    </>
  );
};

export default Order;
