import { useState } from 'react'
import './App.css'
import Footer from './components/footer'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Aboutus from './pages/Aboutus'


function App() {
  return (
    <div className='bg-gray-800'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<Aboutus />} />
    </Routes>
    </div>
  )
}

export default App
