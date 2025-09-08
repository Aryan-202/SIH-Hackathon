import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashBoard from './pages/DashBoard';
import PageNotFound from './pages/PageNotFound';
import SignupPage from './pages/SignupPage';

function App() {
  

  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/dashboard' element={<DashBoard/>}/>
            <Route path='/signup' element={<SignupPage/>}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
