import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'
function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignUp />}></Route>\
      <Route path='/sign-in' element={<SignIn />}></Route>
     
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
