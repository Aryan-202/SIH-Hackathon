import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TouristLandingPage from './TouristLandingPage'

const TouristRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<TouristLandingPage/>} />
      {/* Add other tourist routes here */}
    </Routes>
  )
}

export default TouristRoutes