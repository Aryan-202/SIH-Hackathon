import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLandingPage from '../pages/admin/AdminLandingPage'
import AdminLogin from '../pages/admin/AdminLogin'
import AdminDashboard from '../pages/admin/AdminDashboard'
// import ProtectedRoute from './ProtectedRoute'

const AdminRoutes = () => {
  return (
    <div className='pt-20'>
      <Routes>
        <Route path="/" element={<AdminLandingPage />} />
        <Route path='/login' element={<AdminLogin/>}/>
        <Route 
          path="/dashboard" 
          element={
            // <ProtectedRoute>
              <AdminDashboard />
            // </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  )
}

export default AdminRoutes;