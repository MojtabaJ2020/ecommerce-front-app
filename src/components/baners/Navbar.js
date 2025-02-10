import React from 'react';
import { Link } from 'react-router-dom';
import './../../styles/Navbar.css';
import logo from './../../assets/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/auth/authActions';


function Navbar() {
  const user = useSelector(state => state.auth.user); 
  const dispatch = useDispatch(); 
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          <img src={logo} alt="E-Commerce Logo" />
        </Link>
      </div>

      <div className="nav-center">
        <input type="text" placeholder="Search for products..." className="search-bar" />
      </div>

      <div className="nav-right">
        {user ? (
          <div className="user-info">
            <img 
              src={user.picture || 'default-profile-pic.png'} 
              alt="Profile" 
              className="user-profile-pic"
            />
            <span>{user.name}</span>
            <button onClick={() => dispatch(logout())} className="nav-link logout-btn">Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login" className="nav-link">🔑 Login</Link>  
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
