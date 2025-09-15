import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TouristLandingPage from './TouristLandingPage'
import TouristRegistrationPage from './TouristRegistrationPage'

const TouristRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<TouristLandingPage/>} />
      <Route path='/register' element={<TouristRegistrationPage/>} />
      {/* Add other tourist routes here */}
    </Routes>
  )
}

export default TouristRoutes