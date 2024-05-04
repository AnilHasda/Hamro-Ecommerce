import React from "react";
import { NavLink } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
const Header = () => {
  return (
    <nav className="h-[60px] w-full bg-[blueviolet] text-white flex justify-between items-center px-[10px] sm:px[30px] md:px-10">
      <div className="flex gap-5"><IoCartOutline size={30}/><h3 className="text-xl font-semibold">E-commercer Site</h3></div>
      <IoMdMenu size={30} className="block md:hidden"/>
      <div className="hidden md:flex gap-5">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Profile">Profile</NavLink>
        <NavLink to="/Admin">Admin</NavLink>
        <NavLink to="/Login">Login</NavLink>
        <NavLink to="#">Home</NavLink>
      </div>
    </nav>
  );
};

export default Header;
