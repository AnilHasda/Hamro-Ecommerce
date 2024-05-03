
import React from 'react'
import { Button ,Navbar} from "flowbite-react";
const App = () => {
  return (
      <Navbar fluid rounded className='bg-[blueviolet] text-white'>
      <Navbar.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      <Navbar.Toggle className='bg-[orange] text-white' />
      <Navbar.Collapse>
        <Navbar.Link href="#"className='text-white'>
          Home
        </Navbar.Link>
        <Navbar.Link href="#"className='text-white'>
          About
        </Navbar.Link>
        <Navbar.Link href="#"className='text-white'>Services</Navbar.Link>
        <Navbar.Link href="#"className='text-white'>Pricing</Navbar.Link>
        <Navbar.Link href="#"className='text-white'>Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default App