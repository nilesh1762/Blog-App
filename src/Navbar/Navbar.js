import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import PrivateNavbar from "./PrivateNavbar/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";

const Navbar = () => {
    const user = useSelector((state) => state?.Users?.userAuth?.data);
    const userAuth = user?.user;
   const isAdmin = userAuth?.isAdmin;

   //console.log("admin+++", user)
  // console.log("admi----", userAuth)
  return (
    <>
   
      {isAdmin ? (
        <AdminNavbar isLogin={userAuth} />
      ) : userAuth ? (
        <PrivateNavbar isLogin={userAuth} />
      ) : (
        <PublicNavbar />
      )}
    </>
  );
};

export default Navbar;
