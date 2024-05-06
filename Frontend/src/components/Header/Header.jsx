import React from "react";
import { NavLink } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { BsCartPlus } from "react-icons/bs";
const Header = () => {
  return (
    <nav className="h-[80px] w-full bg-[#ff5900be] text-white flex justify-between items-center px-[10px] sm:px[30px] md:px-10 mb-[1px]">
      <div className="flex gap-5"><IoCartOutline size={30}/><h3 className="text-xl font-semibold">E-commercer Site</h3></div>
      <IoMdMenu size={30} className="block md:hidden"/>
      <div className="hidden md:flex gap-5">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Profile">Profile</NavLink>
        <NavLink to="/Admin">Admin</NavLink>
        <NavLink to="/Login">Login</NavLink>
        <NavLink to="#"className="relative"><BsCartPlus size={30} className=""/><div className="absolute h-5 w-5 rounded-full bg-white top-[-15px] left-4 grid place-content-center text-[rgb(255,106,0)] text-sm">0</div></NavLink>
      </div>
    </nav>
  );
};

export default Header;
