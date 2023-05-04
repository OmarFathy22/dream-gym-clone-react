import React, { useEffect } from 'react'
import ONE from '../../components/exerciseDetails/ONE';


type Props = {}

const Exercises = (props: Props) => {
  useEffect(() => {
    window.scrollTo({top:0})
  },[])
  return (
    <div >
      <ONE/>
    </div>
  )
}

export default Exercises