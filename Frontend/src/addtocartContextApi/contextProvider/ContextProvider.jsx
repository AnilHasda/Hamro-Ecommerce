import React, { useState,useEffect } from "react";
import ContextData from "../Context/createContext";
const ContextProvider = ({ children }) => {
  // this object stores add to cart data
  let [cartData, setCartData] = useState([]);
  // function that dispatch data
  const getData = () => {
    let getCartData = JSON.parse(localStorage.getItem("cartData"));
    setCartData(getCartData || []);
  };
  useEffect(()=>{
    getData();
  },[])
  const addToCart = (items) => {
    setCartData((prev) => {
      let cartItems = [...prev, items];
      localStorage.setItem("cartData", JSON.stringify(cartItems));
      return cartItems;
    });
    getData();
  };
  const removeAll = () => {
    localStorage.removeItem("cartData");
    window.location.reload();
  };
  // function to remove individual item from localStorage
  function removeLocal(id) {
    let data = cartData.filter((ele) => ele.id !== id);
    localStorage.setItem("cartData", JSON.stringify(data));
    getData();
  }
  return (
    <ContextData.Provider value={{ cartData, addToCart, getData,removeAll,removeLocal }}>
      {children}
    </ContextData.Provider>
  );
};

export default ContextProvider;
