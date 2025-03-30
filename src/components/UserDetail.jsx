import { updateUserDetail, updateUserHealth, removeUserDetail } from "../../features/usersSlice";
import { AuthContext } from "../../components/AuthProvide";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useState } from "react";

const UserDetail = ({isMonitor, userID}) => {
  const userData = useSelector((state) => state.users.users[userID]);
  const [isUpdate, setIsUpdate] = useState(false);
  //Profile Update
  const [name, setName] = useState(userData.name);
  const [phone, setPhone] = useState(userData.phone);
  const [address, setAddress] = useState(userData.address);
  //Health Inspection
  const [health, setHealth] = useState(userData.health);
  const [healthStatus, setHealthStatus] = useState(userData.health_status);
  const [description, setDescription] = useState(userData.description);

  const auth = getAuth();
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);

  const onRemove = () => {
    const email = currentUser.email;
    dispatch(removeUserDetail({email}));
    auth.signOut();
  }

  const onToggleUpdate = () => {
    setIsUpdate(!isUpdate);
  }

  const onSubmitUpdate = (e) => {
    e.preventDefault();

    if (isMonitor) {
      dispatch(updateUserHealth({health, healthStatus, description, userID}));
    } else {
      
      dispatch(updateUserDetail({name, phone, address, email}));
    }
  }

  return (
    < >
      <h1>Personal Details</h1>
      <div>
        {(!isMonitor && isUpdate)
          ? <p>Name: {userData.name}</p>
          : <input 
              type="text" 
              placeholder={health} 
              onChange={(e) => setName(e.target.value)} 
            />
        }
        <hr/>
        <p>Age: {userData.age}</p>
        <p>Gender: {userData.gender}</p>
        <p>Birth of Date: {userData.birthDate}</p>
        <hr/>
        {(!isMonitor && isUpdate)
          ? <p>Phone: {userData.phone}</p>
          : <input 
              type="text" 
              placeholder={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
        }
        <p>Email: {userData.email}</p>
        
        {(!isMonitor && isUpdate)
          ? <p>Address: {userData.address}</p>
          : <input 
              type="text" 
              placeholder={health} 
              onChange={(e) => setAddress(e.target.value)} 
            />
        }
      </div>

        {isMonitor && (< >
          <hr/>

          <h1>Health Inspection</h1>
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
        </>)}

      <h3>Modification Action</h3>
      <button onClick={onToggleUpdate}>
          {isUpdate ? "Cancel Update" : "Activate Update"}
      </button>
      {isUpdate && <button onClick={onSubmitUpdate}>Update Detail</button>}
      {!isMonitor && <button onClick={onRemove}>Delete Account</button>}
    </>
  )
}

export default UserDetail;