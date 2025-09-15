import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLandingPage from './AdminLandingPage'


const AdminRoutes = () => {
  return (
    <div className='pt-20'>
<Routes>
      <Route path="/" element={<AdminLandingPage />} />
      {/* You can add more admin-specific routes here later */}
      {/* <Route path="/dashboard" element={<AdminDashboard />} /> */}
      {/* <Route path="/reports" element={<AdminReports />} /> */}
    </Routes>
    </div>
  )
}

export default AdminRoutes