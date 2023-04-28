import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/project3-logo.png"

function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg">
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
            <li className="nav-item">
              <Link to="/signup" className="nav-link" aria-current="page">Signup</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="button btn-outline-dark mt-auto" aria-current="page">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
