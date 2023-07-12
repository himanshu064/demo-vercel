import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/home"
import About from "./pages/about"

function App() {

  return (
    <Routes>
      <Route key='/home' path='/' element={<Home />} />
      <Route key='/about' path='/about' element={<About />} />
    </Routes>
  )
}

export default App
