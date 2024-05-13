import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Store from "./Redux/App/App.js";
import {Provider} from "react-redux";
import ContextProvider from './addtocartContextApi/contextProvider/ContextProvider.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <ContextProvider>
    <App />
    </ContextProvider>
    </Provider>
  </React.StrictMode>,
)
