import React from 'react';
import RouterConfig from './Router/RouterConfig';
import { Toaster } from 'react-hot-toast';
import {ChakraProvider} from "@chakra-ui/react";
const App = () => {
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