import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import Navbar from './component/Navbar'
import Tasks from './pages/Tasks'
import Login from './pages/Login'
import UserContainer from './component/UserContainer'

const App = () => {
  return (
    <>
    <ToastContainer/>
    <Navbar/>
     <Routes>
      <Route path="/"  element={<Home/>}/>
      <Route path="/login"  element={<Login/>}/>
      {/* <Route path="/tasks"  element={<Tasks/>}/> */}

      <Route path="/tasks" element={<UserContainer />}>
      <Route index element={<Tasks />} />
      </Route>
    </Routes>
    </>
   
  )
}

export default App
