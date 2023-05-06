import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="navbar-div">
      <div className="nav-content">
        <h1 className="logo">Siesta Funds </h1>
        {user && <p className="welcome">Hello {user.username}!</p>}
      </div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <NavLink to="/">Home</NavLink>
        </li>
        {!isLoggedIn && (
          <li className="navbar-item">
            <NavLink to="/signup">Sign up</NavLink>
          </li>
        )}
        {!isLoggedIn && (
          <li className="navbar-item">
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className="navbar-item">
            <NavLink to="/private">Courses</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className="navbar-item">
            <NavLink to="/list">My courses</NavLink>
          </li>
        )}
        {isLoggedIn && user && (
          <li className="navbar-item">
            <NavLink to={`/user/${user._id}`}>Profile</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className="navbar-item">
            <NavLink onClick={() => logOutUser()}>Log out</NavLink>
          </li>
        )}
        <li>
          <NavLink onClick={() => navigate(-1)}>Go back</NavLink>
        </li>
      </ul>
    </div>
  );
}
