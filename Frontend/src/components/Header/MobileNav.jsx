import React from 'react'
import { NavLink, useLocation } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { IoMdMenu } from 'react-icons/io';
import { useSelector, useDispatch } from "react-redux";
import Login from "../Login/Login";
import SignUp from "../Signup/SignUp";
import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { getData } from "../../Redux/Slices/Slices";
import { useContextData } from "../../addtocartContextApi/Context/createContext";
import GetData from "../getData/getdata";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";
import { logOut } from "../../Redux/Slices/Slices";
import {
    Drawer,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    DrawerBody,
  } from '@chakra-ui/react'
const MobileNav = () => {
    //variables for drawer
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  let { fetchData } = GetData();
  let { cartData } = useContextData();
  let isAdmin = useSelector((state) => state.isAdmin.status);
  let isLoggin = useSelector((state) => state.isLogged.status);
  let user=useSelector(state=>state.user);
  const getLogOut = async () => {
    try {
      let { data } = await axios.get("http://localhost:4000/logout", {
        withCredentials: true,
      });
      if (data?.message) {
        console.log(data);
        toast.success(data?.message);
        dispatch(logOut({ isLogged: data.isLogged, isAdmin: data.isAdmin }));
      }
      else{
        console.log("data is not present")
      }
    } catch (error) {
     console.log(error)
    }
  };
  return (
    <div>
         {/* Drawer componets stats here */}
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="teal"textColor="white">
          <DrawerCloseButton />
          <DrawerHeader>Hamro E-commerce</DrawerHeader>
          <DrawerBody>
          <div className="flex flex-col gap-5">
        <NavLink
          to="/"
          onClick={fetchData}
          className={`${isLoggin === true && "translate-y-[13px]"}`}
        >
          Home
        </NavLink>
        {isLoggin && (
          <div className=" flex items-center relative left-[-15px]">
            <div className="navbar">
              <div className="dropdown">
                <div className="dropbtn flex gap-1 ">
                  <IoPersonSharp className="mt-[2px]" />
                  {user}
                  <IoMdArrowDropdown
                    size="20px"
                    className="relative left-[-4px] top-1"
                  />
                </div>
                <div className="dropdown-content text-black">
                  <NavLink to="/Profile" className="a">
                    Profile
                  </NavLink>
                  <NavLink to="#" className="a" onClick={getLogOut}>
                    Log Out
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}
        {isAdmin && <NavLink to="/Admin"className="translate-y-[13px]">Admin</NavLink>}
        {isLoggin === false && (
          <>
            <Login />
            <SignUp />
          </>
        )}
        <NavLink
          to="/addToCart"
          className={`${isLoggin && "translate-y-[20px]"} relative top-5`}
        >
          <BsCartPlus size={30} className="" />
          <div className="absolute h-5 w-5 rounded-full bg-white text-red-600 top-[-15px] left-4 grid place-content-center text-sm ">
            {cartData ? cartData.length : 0}
          </div>
        </NavLink>
      </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* Drawer componets end here */}
      <IoMdMenu size={30} className="block lg:hidden" onClick={onOpen} />
    </div>
  )
}

export default MobileNav