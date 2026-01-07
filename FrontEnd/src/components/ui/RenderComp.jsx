import React from 'react'

export default function RenderComp() {
  return (
    <div style={{minHeight:"100vh"}}>
        <iframe 
        src="https://study-planner-app-uon5.vercel.app/dashboard" 
        title="External React Site"
        style={{height:"100vh",width:"100vw",scrollbarWidth:"none"}}
      />
    </div>
  )
}
