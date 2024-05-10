import React from "react";
import { NavLink } from "react-router-dom";
import {Button} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
const AdminNavigation = () => {
  let location=useLocation();
  return (
    <div className="h-auto md:h-[100vh] pr-5 w-[95vw] mx-auto md:w-[400px] pt-10 pl-3 md:border-r-2"style={{height:"calc(100vh - 80px"}}>
        <h3 className="font-bold text-[25px] text-center mb-10">Admin Panel</h3>
    <div className="flex flex-col gap-4 justify-center w-full">
      <NavLink to="/Admin">
        <Button colorScheme={location.pathname==="/Admin"? "orange":"gray"} variant="solid"className="w-full">
          Create Products
        </Button>
      </NavLink>
      <NavLink to="/Admin/showAllData"> <Button className="w-full"colorScheme={location.pathname==="/Admin/showAllData"?"orange":"gray"}>
          Show Product 
        </Button></NavLink>
      <NavLink to="#"> <Button className="w-full"colorScheme={location.pathname===""?"orange":"gray"}>
          Update Product
        </Button></NavLink>
    </div>
    </div>
  );
};

export default AdminNavigation;
