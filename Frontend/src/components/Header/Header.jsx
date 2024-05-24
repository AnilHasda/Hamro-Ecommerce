import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
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
import MobileNav from "./MobileNav";
const Header = () => {
  let location = useLocation();
  let { fetchData } = GetData();
  let { cartData } = useContextData();
  let path =
    location.pathname === "/" ||
    location.pathname === "/Admin/showAllData" ||
    location.pathname === "/addToCart";
  let productItems = useSelector((state) => state.filterResponseData);
  let isAdmin = useSelector((state) => state.isAdmin.status);
  let isLoggin = useSelector((state) => state.isLogged.status);
  let user=useSelector(state=>state.user);
  // console.log(user)
  let dispatch = useDispatch();

  const searchFunction = (key) => {
    let filterData = productItems.filter((ele) => {
      let item = ele.name.toLowerCase();
      let descr = ele.description.toLowerCase();
      return item.includes(key) || descr.includes(key);
    });
    dispatch(getData(filterData));
    // console.log(filterData);
  };
  // logout function
  const getLogOut = async () => {
    try {
      let { data } = await axios.get("http://localhost:4000/logout", {
        withCredentials: true,
      });
      if (data?.message) {
        // console.log(data);
        toast.success(data.message);
        dispatch(logOut({ isLogged: data.isLogged, isAdmin: data.isAdmin }));
      }
      else{
        console.log("data is not present")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-[80px] w-full bg-[rgb(242,117,64)] opacity-100 z-10 sticky top-0 left-0 text-white flex justify-between items-center px-[10px] sm:px[30px] md:px-16 mb-[1px]">
      <div className="flex gap-5">
        <IoCartOutline size={30} />
        <h3 className={`${(location.pathname === "/" || location.pathname==="/addToCart") ? "hidden" :"block"}  md:block sm:text-md md:text-xl font-semibold`}>
          Hamro E-commerce
        </h3>
      </div>
      {/* input chakra component */}
      {path && (
        <InputGroup
          bg="#fff"
          w={{ base: "60%", md: "40%", lg: "40%" }}
          textColor="#000"
          className="rounded-md searchBar"
          outline="none"
        >
          <Input
            pr="4.5rem"
            placeholder="search items here..."
            focusBorderColor="gray.400"
            border={2}
            fontSize={14}
            onChange={(e) => {
              searchFunction(e.target.value.toLowerCase());
            }}
          />
          <InputRightElement width="4.5rem">
            <IoMdSearch size={20} color="gray" />
          </InputRightElement>
        </InputGroup>
      )}
      {/* input chakra component end here*/}
     {/* Mobile Nav will come here */}
     <MobileNav/>
      <div className="hidden lg:flex gap-5">
        <NavLink
          to="/"
          onClick={fetchData}
          className={`${isLoggin === true && "translate-y-[13px]"}`}
        >
          Home
        </NavLink>
        {isLoggin && (
          <div className=" flex items-center">
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
                <div className="dropdown-content">
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
        {isAdmin===false &&
        <NavLink
          to="/addToCart"
          className={`${isLoggin && "translate-y-[10px]"} relative`}
        >
          <BsCartPlus size={30} className="" />
          <div className="absolute h-5 w-5 rounded-full bg-white top-[-15px] left-4 grid place-content-center text-[rgb(255,106,0)] text-sm ">
            {cartData ? cartData.length : 0}
          </div>
        </NavLink>
}
      </div>
    </div>
  );
};

export default Header;
