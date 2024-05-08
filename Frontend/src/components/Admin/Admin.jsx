import React from 'react'
import CreateProducts from './CreateProducts.jsx/CreateProducts';
import AdminNavigation from '../adminNavigation/AdminNavigation';
const Admin = () => {
  return (
    <div className='h-auto w-full flex flex-col md:flex-row md:gap-10 lg:gap-[50px] md:px-[50px]'>
      <AdminNavigation/>
      <CreateProducts/>
    </div>
  )
}

export default Admin