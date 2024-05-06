import React from 'react';
import useGetData from '../../getData/getdata';
import AdminNavigation from '../../adminNavigation/AdminNavigation';
const ShowAllData = () => {
    let response=useGetData();
    console.log(response);
  return (
    <div className='h-auto w-full flex flex-col md:flex-row md:gap-10 lg:gap-[50px] pb-10 md:px-[50px]'>
    <AdminNavigation/>
    <div>
        
    </div>
  </div>
  )
}

export default ShowAllData