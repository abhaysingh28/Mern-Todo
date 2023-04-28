import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const logoutHandler = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div  className="navbar">
      <h1>Login</h1>
      <h1>Ragister</h1>
      <h1 onClick={logoutHandler}>logout</h1>
    </div>
  );
}

export default Navbar;
