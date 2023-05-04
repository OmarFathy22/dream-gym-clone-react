import React, { lazy } from 'react'
// import Footer from "./Footer";
// import Header from './Header';
const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));

import { Outlet } from 'react-router';

type Props = {}

const Root = (props: Props) => {
  
  return (
    <div className="overflow-hidden mx-[5%]">
      <Header/>
      <Outlet/>
        <Footer/> 
    </div>
  )
}

export default Root