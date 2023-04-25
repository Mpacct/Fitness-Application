import React from "react";
import { Link } from "react-router-dom"

function Navbar() {

  return (
    <header className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src="./InitialsLogo.png" alt="Logo" width="50" height="50" className="d-inline-block align-text-center me-2" />
          Fitness Application
        </Link>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link to="/" className="nav-link" aria-current="page">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/exercises" className="nav-link" aria-current="page">Exercises</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link" aria-current="page">Signup</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link" aria-current="page">Login</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
