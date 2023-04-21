import React from 'react';

function NavBar({ currentPage, handlePageChange }) {
    return (
  
      <nav class="navbar navbar-expand-lg">
        {/* <a 
        className="navbar-brand" 
        href="#home">
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a 
              href="#!" 
              onClick={() => handlePageChange('Home')}
  
              className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}
              >Home</a>
            </li>
            <li className="nav-item">
              <a 
              href="#exercises" 
              onClick={() => handlePageChange('Exercises')}
              className={currentPage === 'Exercises' ? 'nav-link active' : 'nav-link'}
              >Exercises</a>
            </li>
            <li className="nav-item">
              <a 
              href="#signup" 
              onClick={() => handlePageChange('Signup')}
              className={currentPage === 'Signup' ? 'nav-link active' : 'nav-link'}
              >Signup</a>
            </li>
            <li className="nav-item">
              <a 
              href="#login" 
              onClick={() => handlePageChange('Login')}
              className={currentPage === 'Login' ? 'nav-link active' : 'nav-link'}
              >Login</a>
            </li>
          </ul>
        </div> */}
      </nav>
  
    );
  }
  
  export default NavBar;