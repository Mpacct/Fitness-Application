import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/project3-logo.png"
import Auth from "../utils/auth"

function Navbar() {
  function handleLogout() {
    if(Auth.loggedIn()) {
      return(
        <Link to="/" className="button btn-outline-dark mt-auto" onClick={() => Auth.logout()} aria-current="page">Logout</Link>

      );
    } else {
      return (
        <Link to="/login" className="button btn-outline-dark mt-auto" aria-current="page">Login</Link>

      );
    };
  };
  function removeSignup() {
    if(Auth.loggedIn()) {
      return;
        

      
    } else {
      return (
        <li className="nav-item">
              <Link to="/signup" className="nav-link" aria-current="page">Signup</Link>
            </li>

      );
    };
  };
  return (
    <nav className="navbar sticky-top navbar-light bg-light navbar-expand-lg">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" width="200" className="d-inline-block align-text-center me-2" />
        </Link>
        <div className="nav-item" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/exercises" className="nav-link" aria-current="page">Exercises</Link>
            </li>
            {removeSignup()}
            <li className="nav-item">
              {handleLogout()}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
