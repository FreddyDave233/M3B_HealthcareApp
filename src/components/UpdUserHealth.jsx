import { updateUserHealth } from "../../features/usersSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

//Need Modal

const UserDetail = ({patientInfo}) => {
  const [isUpdate, setIsUpdate] = useState(false);

  //Health Inspection
  const [health, setHealth] = useState(patientInfo.health) || "";
  const [healthStatus, setHealthStatus] = useState(patientInfo.health_status) || "";
  const [description, setDescription] = useState(patientInfo.description) || "";

  const dispatch = useDispatch();

  const onToggleUpdate = () => {
    setIsUpdate(!isUpdate);
  }

  const onSubmitUpdate = (e) => {
    e.preventDefault();

    dispatch(updateUserHealth({health, healthStatus, description, userID}));
  }

  return (
    < >
      <h1>Patient Details</h1>
      <div>
        <p>Name: {userData.name}</p>
        <hr/>
        <p>Age: {userData.age}</p>
        <p>Gender: {userData.gender}</p>
        <p>Birth of Date: {userData.birthDate}</p>
        <hr/>
        <p>Phone: {userData.phone}</p>
        <p>Email: {userData.email}</p>
        <p>Address: {userData.address}</p>
      </div>

      <div>
        <h2>Health Inspection</h2>
        <div>
          {isUpdate
            ? <p>{userData.health}</p>
            : <input 
                type="text" 
                placeholder={health} 
                onChange={(e) => setHealth(e.target.value)} 
              />
          }
          {isUpdate
            ? <p>{userData.health_status}</p>
            : <input 
                type="text" 
                placeholder={healthStatus} 
                onChange={(e) => setHealthStatus(e.target.value)} 
              />
          }
          <hr/>
          {isUpdate
            ? <p>{userData.description}</p>
            : <textarea
                placeholder={description} 
                onChange={(e) => setDescription(e.target.value)} 
              />
          }
        </div>
      </div>

      <h3>Modified Patient Health</h3>
      <button onClick={onToggleUpdate}>
          {isUpdate ? "Cancel Update" : "Activate Update"}
      </button>
      {isUpdate && <button onClick={onSubmitUpdate}>Update Patient Detail</button>}
    </>
  )
}

export default UserDetail;