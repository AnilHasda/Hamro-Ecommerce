import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { BsCartPlus } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import Login from "../Login/Login";
import SignUp from "../Signup/SignUp";
import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { getData } from "../../Redux/Slices/Slices";
const Header = () => {
  let location = useLocation();
  let path =
    location.pathname === "/" || location.pathname === "/Admin/showAllData";
  let totalCart = useSelector((state) => state.cartItem.total);
  let productItems = useSelector((state) => state.filterResponseData);
  let isAdmin = useSelector((state) => state.isAdmin.status);
  let isLoggin = useSelector((state) => state.isLogged.status);
  console.log({ isLoggin });
  let dispatch = useDispatch();
  //
  const searchFunction = (key) => {
    let filterData = productItems.filter((ele) => {
      let item = ele.name.toLowerCase();
      let descr = ele.description.toLowerCase();
      return item.includes(key) || descr.includes(key);
    });
    dispatch(getData(filterData));
    console.log(filterData);
  };
  return (
    <div className="h-[80px] w-full bg-[rgb(242,117,64)] opacity-100 z-10 sticky top-0 left-0 text-white flex justify-between items-center px-[10px] sm:px[30px] md:px-10 mb-[1px]">
      <div className="flex gap-5">
        <IoCartOutline size={30} />
        <h3 className="hidden sm:block sm:text-md md:text-xl font-semibold">
          E-commerce Site
        </h3>
      </div>
      {/* input chakra component */}
      {path && (
        <InputGroup
          bg="#fff"
          w={{ base: "60vw", md: "40vw", lg: "35vw" }}
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
      <IoMdMenu size={30} className="block lg:hidden" />
      <div className="hidden lg:flex gap-5">
        <NavLink
          to="/"
          onClick={() => {
            location.reload();
          }}
        >
          Home
        </NavLink>
        {isLoggin && <NavLink to="/Profile">Profile</NavLink>}
        {isAdmin && <NavLink to="/Admin">Admin</NavLink>}
        <Login />
        <SignUp />
        <NavLink to="#" className="relative">
          <BsCartPlus size={30} className="" />
          <div className="absolute h-5 w-5 rounded-full bg-white top-[-15px] left-4 grid place-content-center text-[rgb(255,106,0)] text-sm">
            {totalCart}
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
