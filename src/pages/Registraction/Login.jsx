import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { AuthContext, RoleContext } from "../../components/AuthProvide";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useState, useEffect } from "react";
import { fetchStuff } from "../../features/stuffsSlice";
import { fetchUserDetail } from "../../features/usersSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { isStuff } = useContext(RoleContext) || "";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  
  const stuff = useSelector((state) => state.stuffsData.stuffs);
  const user = useSelector((state) => state.users.users);

  const handleLogout = () => auth.signOut(); //Remove

  useEffect(() => {
    console.log(currentUser);
    
    if (currentUser && isStuff) {
      if (stuff.length === 0)
        dispatch(fetchStuff(currentUser.email));

      console.log("Moving to stuff");
      navigate("/stuffs");
    }

    if (currentUser && !isStuff) {
      if (user.length === 0)
        dispatch(fetchUserDetail(currentUser.email));

      console.log("Moving to user");
      navigate("/users");
    }
  }, [currentUser])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("Invalid Email or Password: ", error.code, error.message);
      console.error(error);
    }
  }

  return (
    < >
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)}/>
        
        <label>Password</label>
        <input type="text" onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit">Submit</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Login;