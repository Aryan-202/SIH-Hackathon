import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Briefcase } from 'lucide-react';

// IMPORTANT: Replace this path with the actual path to your new circular, transparent logo file
import SafvoyLogo from '../../pages/common/Logo.png'; 

const Navbar = () => {
  return (
    // --- MODIFIED: Reverted to a light, professional background ---
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white p-6 rounded-b-3xl border-b border-gray-200 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Logo integration */}
          <img src={SafvoyLogo} alt="Safvoy Logo" className="h-18 w-18 object-contain" />
          {/* --- MODIFIED: Text color for light background --- */}
          <h1 className="text-2xl font-bold text-gray-800">
            SafVoy
          </h1>
        </div>
        <div className="flex space-x-2 md:space-x-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </NavLink>
          <NavLink
            to="/tourist"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            <Users className="w-5 h-5 mr-2" />
            Tourists
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            <Briefcase className="w-5 h-5 mr-2" />
            Authorities
          </NavLink>
        </div>
      </div>
      {/* --- MODIFIED: Styles updated for light background --- */}
      <style>{`
        .nav-link {
          @apply flex items-center justify-center rounded-full px-4 py-2 font-semibold text-gray-600 transition-all duration-300;
        }
        .nav-link:hover {
          @apply text-blue-600 bg-blue-50;
        }
        .nav-link-active {
          @apply bg-blue-600 text-white shadow-lg shadow-blue-600/40;
        }
        .nav-link-active:hover {
          @apply bg-blue-700;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;