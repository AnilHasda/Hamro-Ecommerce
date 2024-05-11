import React from 'react'
import { NavLink } from 'react-router-dom'
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
const Footer = () => {
  return (
    <div className='min-h-[200px] w-full bg-[#f1f1f1] pl-4 text-sm md:pl-[50px] py-10'>
        <h3 className='font-semibold text-md'>Connect with us:</h3>
        <div className='h-auto w-auto flex gap-5 text-[20px] mt-1'>
        <a href="www.facebook.com"><CiFacebook/></a>
        <a href="www.facebook.com"><FaXTwitter/></a>
        <a href="www.facebook.com"><FaWhatsapp/></a>
        <a href="www.facebook.com"><FaInstagram/></a>
        </div>
        <div className='flex gap-4 items-center my-2'>
            <h3 className='text-md font-semibold'>contact us:</h3>
            <div className='flex items-center gap-1'><BsTelephone/><h3>+977 9800000000</h3></div>
        </div>
        <div className='flex gap-4 items-center'>
            <h3 className='text-md font-semibold'>Email:</h3>
            <div className='flex items-center gap-1'><MdOutlineEmail/><h3>hamroeco@gmail.com</h3></div>
        </div>
        <div className='flex gap-4 items-center mt-2'>
            <h3 className='text-md font-semibold'>Location:</h3>
            <div className='flex items-center gap-1'><IoLocationOutline/><h3>Gauradaha-3,Jhapa</h3></div>
        </div>
        <div className='text-center mt-4'><p>© 2024 hamroecommerce. All rights reserved.</p></div>
    </div>
  )
}

export default Footer