import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ResetPassword from './pages/ResetPassword'
function App():React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  )
}

export default App
