import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserContainer = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    return (
    <>
      <div >
          {userData && userData.email ? <Outlet /> : <Navigate to="/login" />}
      </div>
     
    </>
  );
};

export default UserContainer;
