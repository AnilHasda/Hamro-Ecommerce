import React from 'react'
import { NavLink } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='h-[100vh] w-full flex items-center justify-center flex-col'>
        <h1 className='text-[60px] font-bold'>OOPS!! 404 PAGE NOT FOUND</h1>
        <NavLink to="/"className="underline">Back to home page</NavLink>
    </div>
  )
}

export default PageNotFound;