import React,{useState} from 'react'
import ContextData from '../Context/createContext'
const ContextProvider = ({children}) => {
  // this object stores add to cart data
  let [cartData,setCartData]=useState([]);
    // function that dispatch data
    const addToCart=(items)=>{
setCartData(prev=>[...prev,items]);
localStorage.setItem("cartData",JSON.stringify(cartData));
    }
  return (
    <ContextData.Provider value={{cartData,addToCart}}>{children}</ContextData.Provider>
  )
}

export default ContextProvider;