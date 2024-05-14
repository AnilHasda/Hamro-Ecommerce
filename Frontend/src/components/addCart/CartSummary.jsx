import React from 'react'
import {Button,Input} from "@chakra-ui/react"
const CartSummary = ({price}) => {
  return (
    <div className='cart-summary flex flex-col gap-3 w-auto pl-5 md:pl-10 py-10  border-l-2'>
        <h3 className='font-bold text-md'>Cart Summary</h3>
        <p className='text-sm'>Checkout | Payment</p>
        <div><Input type="text"autoComplete='off'w="auto"/><Button ml={1} colorScheme='orange'>Voucher</Button></div>
        <div className='text-[rgb(242,117,64)] flex gap-2'>Total:<p>${price}</p></div>
        <Button colorScheme='teal'w={{base:"90vw",sm:"60vw",md:"full"}}>Checkout</Button>
        </div>
  )
}

export default CartSummary