import React from 'react'
import './loader.css';
export default function Loader() {
  return (
     <div>
      
      <div className='blur-background'></div>
      <div className="box-loader">
      <div className='loader-message'>Loading...</div>
      <div className="loader"><div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div></div>
    </div>
    </div>
  )
}
