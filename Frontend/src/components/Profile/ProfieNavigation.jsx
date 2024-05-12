import React from 'react';
import {Button} from "@chakra-ui/react";
import Order from './Order';
import { NavLink } from 'react-router-dom';
const ProfieNavigation = () => {
  return (
    <div className='w-[95vw] md:w-[300px] px-5  flex flex-col gap-5 border-r-2'>
        <Button mt="40px">Profile</Button>
       <NavLink to="order"><Button>Order</Button></NavLink> 
    </div>
  )
}

export default ProfieNavigation