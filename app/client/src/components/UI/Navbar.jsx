import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Briefcase } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-2xl shadow-2xl p-6 rounded-b-3xl border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 drop-shadow-sm">Safety System</h1>
        <div className="flex space-x-2 md:space-x-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            <Home className="w-5 h-5 mr-1 md:mr-2" />
            Home
          </NavLink>
          <NavLink
            to="/tourist"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            <Users className="w-5 h-5 mr-1 md:mr-2" />
            Tourists
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            <Briefcase className="w-5 h-5 mr-1 md:mr-2" />
            Authorities
          </NavLink>
        </div>
      </div>
      {/* Custom Tailwind CSS classes */}
      <style>{`
        .nav-link {
          @apply text-gray-700 font-semibold px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center;
        }
        .nav-link:hover {
          @apply bg-blue-100 text-blue-600 shadow-md transform scale-105;
        }
        .nav-link-active {
          @apply bg-blue-500 text-white shadow-xl transform scale-110;
        }
        .nav-link-active:hover {
          @apply bg-blue-600;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
