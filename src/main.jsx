import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { configureStore } from '@reduxjs/toolkit';
import refElement from './components/features/RefElement'
import exerciseName from './components/features/exerciseName';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
const store = configureStore({
  reducer:{
    REF:refElement,
    exercisename:exerciseName,
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store = {store}>
        <HelmetProvider>
    <App />
    {/* <div className='h-[100vh] w-[100vw] flex flex-col  items-center'>
      <h1 className='font-bold flex-1 bg-[#3e3c3c] text-white w-full flex items-center justify-center'>Sorry, this site is temporary down...</h1>
    </div> */}
        </HelmetProvider>

    </Provider>
  </React.StrictMode>,
)
