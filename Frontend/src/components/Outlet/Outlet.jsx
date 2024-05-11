import React from 'react'
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';
const Layout = () => {
  let location=useLocation();
  let path=location.pathname==="/" || location.pathname==="/Profile";
  return (
   <>
   <Header/>
   <Outlet/>
   {path &&
   <Footer/>
}
   </>
  )
}

export default Layout;