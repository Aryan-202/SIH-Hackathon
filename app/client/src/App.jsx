import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/common/LandingPage'
import AdminRoutes from './pages/admin/AdminRoutes'
import TouristRoutes from './pages/tourist/TouristRoutes'
import About from './pages/common/About'
import Navbar from './components/UI/Navbar'
import Footer from './components/UI/Footer'

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
        </Routes>
        <Routes>
          <Route path='/admin/*' element={<AdminRoutes/>}/>
        </Routes>
        <Routes>
          <Route path='/tourist/*' element={<TouristRoutes/>} />
        </Routes>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App
