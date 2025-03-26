import { createUser, fetchAllUsers, fetchUserDetail, fetchPatients, updateUserDetail, updateUserHealth, removeUserDetail } from "../features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const CreateUser = () => {
  const dispatch = useDispatch();

  const handleCreate =  async (e) => {
    e.preventDefault();
    dispatch(createUser());
  }
  
  return (
    < >
      <h1>CREATE SECTION</h1>
      <button onClick={handleCreate}>Create User</button>
    </>
  )
}

const UserDetail = () => {
  const allUser = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [])

  return (
    < >
      <h1>ALL USER DETAIL</h1>
      {allUser.map((user) => (
        <ul key={user.id}>
          <li>user.username</li>
          <li>user.age</li>
          <li>user.gender</li>
        </ul>
      ))}
    </>
  )
}


const Dashboard = () => {

  return (
    < >
      <h1>User Dashboard</h1>
      <hr/>
      
      <CreateUser />
      <hr />
      
      <UserDetail />
    </>
  )
};

export default Dashboard;