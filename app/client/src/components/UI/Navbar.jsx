import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <NavLink to='/home'>Home</NavLink>
      {/* Add more navigation links as needed */}
    </nav>
  );
};

export default Navbar;