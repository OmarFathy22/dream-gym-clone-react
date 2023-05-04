import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { configureStore } from '@reduxjs/toolkit';
import selectedexercise from './components/features/selectedExercise'
import exerciseName from './components/features/exerciseName';
import { Provider } from 'react-redux';
const store = configureStore({
  reducer:{
    exercise:selectedexercise,
    exercisename:exerciseName,
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store = {store}>
    <App />
    
    </Provider>
  </React.StrictMode>,
)
