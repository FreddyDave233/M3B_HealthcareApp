import { createUser, fetchAllUsers, fetchUserDetail, fetchPatients, updateUserDetail, updateUserHealth, removeUserDetail } from "../../features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import NewUser from "../../components/NewUser";

//Workable //Need Difference between array or non-array
const UsersDetail = () => {
  const allUser = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    < >
      <h1>ALL USER DETAIL</h1>
      {Array.isArray(allUser) 
        ? (allUser.map((user) => (
          <ul key={user.id}>
            <li>{user.username}</li>
            <li>{user.age}</li>
            <li>{user.gender}</li>
          </ul>
        ))) : (
          <ul>
            <li>{allUser.username}</li>
            <li>{allUser.age}</li>
            <li>{allUser.gender}</li>
          </ul>
        )
      }
    </>
  )
}

const DeleteUser = () => {
  const dispatch = useDispatch();

  const handleDelete =  async (e) => {
    e.preventDefault();
    dispatch(removeUserDetail());
  }

  return (
    < >
      <h1>Delete SECTION</h1>
      <button onClick={handleDelete}>Delete User</button>
    </>
  )
}

const UpdateUser = () => {
  const dispatch = useDispatch();

  const handleUpdate =  async (e) => {
    e.preventDefault();
    dispatch(updateUserDetail());
  }

  return (
    < >
      <h1>UPDATE SECTION</h1>
      <button onClick={handleUpdate}>Update User</button>
    </>
  )
}

const Dashboard = () => {

  return (
    < >
      <h1>User Dashboard</h1>
      <hr/>

      <NewUser />
      <hr />

      <UpdateUser />
      <hr />
      
      <DeleteUser />
      <hr />
      
      <UsersDetail />
    </>
  )
};

export default Dashboard;