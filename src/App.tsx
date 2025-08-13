import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
<<<<<<< HEAD
import Dashboard from './pages/Dashboard'
function App():React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/dashboard' element={<Dashboard/>}/>
=======
import ResetPassword from './pages/ResetPassword'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
>>>>>>> 37eb00c21da68fc0a3f9c5ad36d0847ec6e4afdc
    </Routes>
  )
}

export default App
