import React, { Suspense, lazy, useEffect } from 'react'
import Loading from '../Loading';
// import ONE from '../../components/exerciseDetails/ONE';
const ONE = lazy(() => import('../../components/exerciseDetails/ONE'));


type Props = {}

const Exercises = (props: Props) => {
  return (
<Suspense fallback={<Loading/>}>
      <div >
        <ONE/>
      </div>
</Suspense>
  )
}

export default Exercises