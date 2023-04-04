import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const PrivateProtectRoute = ({ children }) => {
  //check if user is loggin
  const user = useSelector(state => state?.Users);
  const { userAuth } = user;
  let location = useLocation();

  return(
    userAuth ? <Outlet /> : <Navigate to="/login" />
  )
};

export default PrivateProtectRoute;
