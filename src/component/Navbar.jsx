import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
//   const userData = JSON.parse(localStorage.getItem("user"));
// const logOut = localStorage.getItem("user")
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold" to="/">
            Task Management
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 ">
              <li className="nav-item">
                <NavLink className="nav-link fs-5 text-dark active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fs-5 text-dark" to="/tasks">
                  Tasks
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fs-5 text-dark" to="/login">
                  Login
                </NavLink>
              </li>

              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
