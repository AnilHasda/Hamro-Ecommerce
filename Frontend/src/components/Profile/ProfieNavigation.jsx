import React from 'react';
import {Button} from "@chakra-ui/react";
import { NavLink } from 'react-router-dom';
const ProfieNavigation = () => {
  return (
    <div className='w-[95vw] md:w-[300px] mx-auto md:mx-0 md:px-5  flex flex-col gap-5 md:border-r-2'>
        <NavLink to="/Profile"><Button mt="40px"w="full">Profile</Button></NavLink>
       <NavLink to="/Profile/order"><Button w="full">Order</Button></NavLink> 
    </div>
  )
}

export default ProfieNavigation;