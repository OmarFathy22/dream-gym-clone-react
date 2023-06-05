import React, { lazy } from 'react'
// import Footer from "./Footer";
// import Header from './Header';
const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));

import { Outlet } from 'react-router';
import ScrollToTop from './ScrollToTop';

type Props = {}

const Root = (props: Props) => {
  
  return (
    <div className="overflow-hidden">
      <ScrollToTop/>
      <Header/>
      <div className='mx-[5%]'>
        <Outlet />
      </div>
        <Footer/> 
    </div>
  )
}

export default Root