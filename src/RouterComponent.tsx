import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router'

const RouterComponent = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<div>hhh</div>}/>
        {/* <Route path='/faq' element={<div>iou</div>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default RouterComponent