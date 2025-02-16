import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const userData = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      {userData ? (
        <h1  className="py-5 text-center">Welcome, {userData.email}!</h1>
      ) : (
        <>
        <div className="text-center">
        <h1 className="mt-4 text-center">No user data available. Please log in.</h1>
        <NavLink to="/login" className="fs-4" >Login</NavLink>
        </div>
       
        </>
      )}{" "}
    </div>
  );
};

export default Home;
