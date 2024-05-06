import React from 'react';
import RouterConfig from './Router/RouterConfig';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
      <div className='h-auto max-w-[1440px] m-auto'>
<RouterConfig/>
<Toaster/>
      </div>
  )
}

export default App