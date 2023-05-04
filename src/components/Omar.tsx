import React from 'react'
import { Outlet, useLocation, useParams } from 'react-router'

type Props = {}

const Omar = (props: Props) => {
  const {Id} = useParams();
  const location = useLocation();
  return (
    <div className='bg-red-500 h-[100vh]'>
      <h1>Id</h1>
      {location.pathname == "112" && <h1>Omar fathy is here</h1>}
      {location.pathname !== "112" && <h1>Omar fathy is here</h1>}
      <Outlet/>
    </div>
  )
}

export default Omar