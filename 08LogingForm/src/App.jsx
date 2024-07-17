import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SingnUp'
function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn />}></Route>\
      <Route path='/sing-up' element={<SignUp />}></Route>
     
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
