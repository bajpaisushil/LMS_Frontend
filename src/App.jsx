import { useState } from 'react'
import './App.css'
import Footer from './components/footer'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Aboutus from './pages/Aboutus'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Contact from './pages/Contact'
import Denied from './pages/Denied'
import CourseList from './pages/Course/CourseList'
import CourseDescription from './pages/Course/CourseDescription'
import CreateCourse from './pages/Course/CreateCourse'
import RequireAuth from './components/Auth/RequireAuth'
import Profile from './pages/User/Profile'
import EditProfile from './pages/User/EditProfile'
import Checkout from './pages/Payment/Checkout'
import CheckoutSuccess from './pages/Payment/CheckoutSuccess'


function App() {
  return (
    <div className='bg-gray-800'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<Aboutus />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/courses' element={<CourseList />} />
      <Route path='/course/description' element={<CourseDescription />} />
      <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
        <Route path='/user/profile' element={<Profile />} />
        <Route path='/user/editprofile' element={<EditProfile />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/checkout/success' element={<CheckoutSuccess />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        <Route path='/course/create' element={<CreateCourse />} />
      </Route>
      <Route path='/login' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/denied' element={<Denied />} />
    </Routes>
    </div>
  )
}

export default App
