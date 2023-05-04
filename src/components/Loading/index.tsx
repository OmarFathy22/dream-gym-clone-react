import React from 'react'
type Props = {}

const Loading = (props: Props) => {
  return (
    <div>
      <main className='mainLoader flex justify-center items-center'>
      <div className="loader"></div>
      </main>
    </div>
  )
}

export default Loading;
