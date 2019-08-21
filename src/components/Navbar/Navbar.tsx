import React from 'react';
import { NavLink } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import './Navbar.css';

const Navbar: React.FC = () => {
  const handleLogout = () => localStorage.setItem('token', '');
  const token: any = localStorage.getItem('token');
  // Invalid token will throw err, handling needed??
  const { name } = jwtDecode(token);

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <div className="user-info__container">
          <NavLink to="/dashboard">
            <div id="logo">
              <h1>
                CURiOUS
                <span>!</span>
              </h1>
            </div>
          </NavLink>
          <div className="user-info__user-name">
            <p>
            Welcome
            </p>
            <p>
              {name}
            </p>
          </div>
        </div>
        <nav className="navbar__nav__container">
          <ul className="navbar__nav">
            <li className="navbar__nav__item">
              <NavLink to="/dashboard">My Roadmaps</NavLink>
            </li>
            <li className="navbar__nav__item">
              <NavLink to="/discover">Discover</NavLink>
            </li>
            <li className="navbar__nav__item">
              <NavLink to="/" onClick={handleLogout}>Sign Out</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
