import React from 'react'

export default function RenderComp() {
  const date="08/01/2026"
  return (
    <div>
        <iframe 
        src={`https://study-planner-app-uon5.vercel.app/dashboard/?v=${date}`}
        title="External React Site"
        style={{height:"100vh",
          width:"100%",
          height:"100vh",
          border:"none"
        }}
      />
    </div>
  )
}
