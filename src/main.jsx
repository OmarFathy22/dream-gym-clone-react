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
    {/* <App /> */}
    <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
      <h1 className='font-bold'>Sorry, this site is temporary down...</h1>
    </div>
        </HelmetProvider>

    </Provider>
  </React.StrictMode>,
)
