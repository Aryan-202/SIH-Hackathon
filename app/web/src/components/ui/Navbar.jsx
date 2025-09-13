import React, { useState, useEffect } from 'react';
import {Link , useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  const navigateLogin = () =>{
    navigate('/login')
  }

  const navigateSignup = () =>{
    navigate('/signup')
  }

  

  // Handle window resize
  useEffect(() => {
    
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled-style' : ''}`}>
      <div className="nav-container">
        {/* Logo and Brand Name */}
        <div className="nav-logo">
          <div className="logo-icon">🛡️</div>
          <div className="brand-info">
            <span className="brand-name">SafeTour</span>
            <span className="brand-tagline">Tourist Safety System</span>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="#home" className="nav-link" onClick={closeMenu}>Home</a>
          </li>
          <li className="nav-item">
            <a href="#features" className="nav-link" onClick={closeMenu}>Features</a>
          </li>
          <li className="nav-item">
            <a href="#for-authorities" className="nav-link" onClick={closeMenu}>Authorities</a>
          </li>
          <li className="nav-item">
            <Link to="/tourist" className="nav-link" onClick={closeMenu}>Tourist</Link>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link" onClick={closeMenu}>Contact</a>
          </li>
        </ul>

        {/* Right-side actions */}
        <div className="nav-actions">
          {/* Desktop buttons */}
          <div className="desktop-buttons">
            <button onClick={navigateLogin} className="login-btn">Login</button>
            <button onClick={navigateSignup} className="signup-btn">Sign Up</button>
          </div>
          
          {/* Mobile buttons - shown in menu */}
          {isMobile && isMenuOpen && (
            <div className="mobile-buttons">
              <button className="login-btn mobile" onClick={closeMenu}>Login</button>
              <button className="signup-btn mobile" onClick={closeMenu}>Sign Up</button>
            </div>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
      
      {/* Mobile overlay */}
      {isMenuOpen && isMobile && (
        <div className="mobile-overlay" onClick={closeMenu}></div>
      )}

      <style jsx>{`
        .navbar {
          background: linear-gradient(135deg, #1a365d 0%, #2a4365 100%);
          padding: 0.8rem 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          position: sticky;
          top: 0;
          z-index: 1000;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          transition: all 0.3s ease-in-out;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          z-index: 1001;
        }

        .logo-icon {
          font-size: 2rem;
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          border-radius: 50%;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 8px rgba(66, 153, 225, 0.3);
          flex-shrink: 0;
        }

        .brand-info {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .brand-name {
          color: white;
          font-size: 1.6rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          line-height: 1.2;
        }

        .brand-tagline {
          color: #a0aec0;
          font-size: 0.85rem;
          font-weight: 400;
          line-height: 1;
        }
        
        .scrolled-style {
        /* Your styles for the scrolled state */
        background-color: #ffffff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        /* Add other styles like padding or height changes */
        }

        .nav-menu {
          display: flex;
          list-style: none;
          gap: 2.2rem;
          margin: 0;
          padding: 0;
          align-items: center;
        }

        .nav-link {
          color: #e2e8f0;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          padding: 0.5rem 0;
          position: relative;
          font-size: 1rem;
          display: block;
        }

        .nav-link:hover {
          color: #ffffff;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #4299e1;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          z-index: 1001;
        }

        .desktop-buttons {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }

        .mobile-buttons {
          display: none;
        }

        .login-btn {
          background: transparent;
          color: white;
          border: 1px solid #cbd5e0;
          padding: 0.6rem 1.4rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .login-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: #4299e1;
        }

        .signup-btn {
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          color: white;
          border: none;
          padding: 0.7rem 1.6rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 8px rgba(66, 153, 225, 0.3);
          white-space: nowrap;
        }

        .signup-btn:hover {
          background: linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(66, 153, 225, 0.4);
        }

        .menu-toggle {
          display: none;
          flex-direction: column;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0.5rem;
          z-index: 1001;
        }

        .bar {
          width: 25px;
          height: 3px;
          background-color: white;
          margin: 3px 0;
          transition: all 0.4s ease;
          border-radius: 2px;
          transform-origin: center;
        }

        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        /* Tablet responsiveness */
        @media screen and (max-width: 1024px) {
          .navbar {
            padding: 0.8rem 1.5rem;
          }
          
          .nav-menu {
            gap: 1.8rem;
          }
          
          .brand-name {
            font-size: 1.5rem;
          }
          
          .brand-tagline {
            font-size: 0.8rem;
          }
        }

        @media screen and (max-width: 968px) {
          .brand-tagline {
            display: none;
          }
          
          .nav-menu {
            gap: 1.5rem;
          }
          
          .desktop-buttons {
            gap: 0.8rem;
          }
          
          .login-btn, .signup-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
        }

        /* Mobile responsiveness */
        @media screen and (max-width: 768px) {
          .navbar {
            padding: 0.8rem 1rem;
          }
          
          .menu-toggle {
            display: flex;
          }
          
          .desktop-buttons {
            display: none;
          }
          
          .nav-menu {
            position: fixed;
            left: -100%;
            top: 0;
            flex-direction: column;
            background: linear-gradient(180deg, #1a365d 0%, #2a4365 100%);
            width: 100%;
            height: 100vh;
            padding: 8rem 2rem 2rem;
            text-align: center;
            transition: left 0.4s ease;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
            gap: 2rem;
            justify-content: flex-start;
            z-index: 1000;
          }
          
          .nav-menu.active {
            left: 0;
          }
          
          .nav-item {
            width: 100%;
          }
          
          .nav-link {
            font-size: 1.1rem;
            padding: 1rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            width: 100%;
          }
          
          .nav-link::after {
            display: none;
          }
          
          .mobile-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 2rem;
            width: 100%;
          }
          
          .login-btn.mobile,
          .signup-btn.mobile {
            width: 100%;
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
          }
          
          .brand-name {
            font-size: 1.4rem;
          }
          
          .logo-icon {
            width: 40px;
            height: 40px;
            font-size: 1.8rem;
          }
        }

        /* Animation for menu icon */
        .menu-toggle.active .bar:nth-child(1) {
          transform: rotate(-45deg) translate(-5px, 6px);
        }

        .menu-toggle.active .bar:nth-child(2) {
          opacity: 0;
        }

        .menu-toggle.active .bar:nth-child(3) {
          transform: rotate(45deg) translate(-5px, -6px);
        }

        /* Very small screens */
        @media screen and (max-width: 480px) {
          .navbar {
            padding: 0.6rem 0.8rem;
          }
          
          .brand-name {
            font-size: 1.2rem;
          }
          
          .logo-icon {
            width: 35px;
            height: 35px;
            font-size: 1.6rem;
          }
          
          .nav-menu {
            padding: 6rem 1.5rem 2rem;
          }
        }

        /* Large screens optimization */
        @media screen and (min-width: 1400px) {
          .nav-container {
            max-width: 1400px;
          }
          
          .nav-menu {
            gap: 2.8rem;
          }
          
          .brand-name {
            font-size: 1.8rem;
          }
          
          .brand-tagline {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;