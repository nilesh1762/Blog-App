import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoute = ({ children}) => {
  //check if user is loggin
  const user = useSelector(state => state?.Users);
  const { userAuth } = user;
  const isAdmin = userAuth?.data?.user?.isAdmin;
  let location = useLocation();

  return(
    isAdmin ? <Outlet /> : <Navigate to="/login" />
  )

    // if (!isAdmin) {
    //   return <Navigate to="/login" state={{ from: location }} />;
    // }
    // return children;
};

export default AdminRoute;
