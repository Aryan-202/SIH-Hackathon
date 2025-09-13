import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashBoard from './pages/DashBoard';
import PageNotFound from './pages/PageNotFound';
import SignupPage from './pages/SignupPage';
import { GoogleOAuthProvider } from '@react-oauth/google'
//import TouristPage from './pages/TouristPage';
import TouristPage from './pages/TouristPage';
// You must define your Google Client ID here.
// Get this from your Google Cloud Console project.
const clientId = "213842657098-jppcg1cul11sthuhc1717eq15f8btapq.apps.googleusercontent.com";

function App() {
  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/dashboard' element={<DashBoard/>}/>
            <Route path='/signup' element={
            

              <GoogleOAuthProvider clientId={clientId}>
                  <SignupPage />
              </GoogleOAuthProvider>
              }/>
            
            <Route path='/tourist' element={<TouristPage />} />
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
