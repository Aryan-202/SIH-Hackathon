import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TouristLandingPage from '../pages/tourist/TouristLandingPage'
import TouristRegistrationPage from '../pages/tourist/TouristRegistrationPage'
import TouristDashboard from '../pages/tourist/TouristDashboard'

const TouristRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<TouristLandingPage/>} />
      <Route path='/register' element={<TouristRegistrationPage/>} />
      {/* Add other tourist routes here */}
      <Route path='/dashboard' element={<TouristDashboard/>} />
    </Routes>
  )
}

export default TouristRoutes