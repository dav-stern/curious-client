import React from 'react';
import { NavLink } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import './Navbar.css';

const Navbar: React.FC = () => {
  const token: any = localStorage.getItem('token');
  // Invalid token will throw err, handling needed??
  const { name } = jwtDecode(token);

  const handleLogout = () => localStorage.setItem('token', '');

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <div className="user-info__container">
          <div className="user-info__avatar">
            <img
              src="https://www.chaarat.com/wp-content/uploads/2017/08/placeholder-user.png"
              alt="Avatar"
            />
          </div>
          <div className="user-info__user-name">
            <p>
              {name}
            </p>
          </div>
        </div>
        <nav className="navbar__nav__container">
          <ul className="navbar__nav">
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
