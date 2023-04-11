import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import PrivateNavbar from "./PrivateNavbar/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";
import AccountVerificationAlertWarning from "./Alerts/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "./Alerts/AccountVerificationSuccessAlert";

const Navbar = () => {
    const user = useSelector((state) => state?.Users?.userAuth?.data);
    const userAuth = user?.user;
    const isAdmin = userAuth?.isAdmin;
    const isAccountVerified = userAuth?.isAccountVerified;

    //Account Verification
    const account = useSelector((state) => state?.accountVericationSlices);
    const { loading, appErr, serverErr, token} = account;
  //  console.log("account+++", userAuth)
  //  console.log("admi----", userAuth, isAccountVerified)
  return (
    <>
   
      {isAdmin ? (
        <AdminNavbar isLogin={userAuth} />
      ) : userAuth ? (
        <PrivateNavbar isLogin={userAuth} />
      ) : (
        <PublicNavbar />
      )}

      {userAuth && !isAccountVerified && <AccountVerificationAlertWarning /> }
      {loading && <h1 className="text-center">Loading Please Wait...</h1>}
      {token && <AccountVerificationSuccessAlert />}
      {appErr || serverErr  ? <h2 className="text-center text-red-500"> {serverErr} {appErr} </h2> : null}
    </>
  );
};

export default Navbar;
