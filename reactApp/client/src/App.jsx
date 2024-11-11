import React from 'react'
import HomePage from './pages/Home/HomePage'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { Route, Routes } from 'react-router-dom'
import './App.css';
import ProtectedRoute from './context/ProtectedRoute'

const App = () => {
  return (
    <div className="">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};




export default App