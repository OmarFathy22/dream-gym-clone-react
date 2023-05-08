import React from 'react'
import './style.css'
type Props = {}

const Loading = (props: Props) => {
  return (
    <div>
      <main className='mainLoader flex justify-center items-center'>
      <div className="container">
  <div className="loading">
    <div className="loading__letter">L</div>
    <div className="loading__letter">o</div>
    <div className="loading__letter">a</div>
    <div className="loading__letter">d</div>
    <div className="loading__letter">i</div>
    <div className="loading__letter">n</div>
    <div className="loading__letter">g</div>
    <div className="loading__letter">.</div>
    <div className="loading__letter">.</div>
    <div className="loading__letter">.</div>
  </div>
</div>

      </main>
    </div>
  )
}

export default Loading;
