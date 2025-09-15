import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/common/LandingPage'
import AdminRoutes from './pages/admin/AdminRoutes'
import TouristRoutes from './pages/tourist/TouristRoutes'

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
        </Routes>
        <Routes>
          <Route path='/admin/*' element={<AdminRoutes/>}/>
        </Routes>
        <Routes>
          <Route path='/tourist/*' element={<TouristRoutes/>} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App
