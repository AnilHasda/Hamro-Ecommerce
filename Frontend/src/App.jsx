import React from 'react';
import RouterConfig from './Router/RouterConfig';
import { Toaster } from 'react-hot-toast';
import {ChakraProvider} from "@chakra-ui/react";
import GetData from './components/getData/getdata';
import "./App.css";
const App = () => {
  GetData();
  return (
    <ChakraProvider>
      <div className='h-auto max-w-[1440px] m-auto'>
<RouterConfig/>
<Toaster/>
      </div>
      </ChakraProvider>
  )
}

export default App