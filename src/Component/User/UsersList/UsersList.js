import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAction } from "../../../Redux/slice/users/userSlices";


// import UsersListHeader from "./UsersListHeader";
 import UsersListItem from "./UsersListItem";

const UsersList = (props) => {

  const users = useSelector(state => state?.Users);
  const { usersList, appErr, serverErr, loading,block, unblock } = users;
  const getvalue = props;
 
  const dispatch = useDispatch();
  //fetch all users
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [block, unblock]);


  return (
    <>
      <section className="py-8 bg-gray-900 min-h-screen">
        {loading ? (
          <h1>Loading</h1>
        ) : appErr || serverErr ? (
          <h3 className="text-center text-yellow-400 text-lg">
            {serverErr} {appErr}
          </h3>
        ) : usersList?.length <= 0 ? (
          <h2>No User Found</h2>
        ) : (
          usersList?.map((user, id) => (
             
              <UsersListItem user={user} getvalue = {getvalue} key = {id}/>
         
          ))
        )}
      </section>
    </>
  );
};

export default UsersList;
