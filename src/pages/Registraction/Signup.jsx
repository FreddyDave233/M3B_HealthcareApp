import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { AuthContext } from "../../components/AuthProvide";

import { useContext, useState, useEffect } from "react";
import { createUser, fetchUserDetail } from "../../features/usersSlice";
import { createStuff, fetchStuff } from "../../features/stuffsSlice";
import { useDispatch, useSelector } from "react-redux";

//Function Validation
const isHealthcareEmail = (email) => {
  return email.endsWith("@healthcare.com");
}

//Create Personal Detail
const CreateInfo = ({isStuff, registerEmail, hasCreated}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("Male");
  const [email] = useState(registerEmail);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [position, setPosition] = useState("Registered Nurse");
  const [specialist, setSpecialist] = useState("Endocrinologist");
  const [department, setDepartment] = useState("Endocrinology");
  
  const dispatch = useDispatch();

  const handleCreate =  async (e) => {
    e.preventDefault();

    if (isStuff) {
      dispatch(createStuff({name, phone, email, age, gender, address, birthDate, position, specialist, department}));
      setPosition("Registered Nurse");
      setSpecialist("Endocrinologist");
      setDepartment("Endocrinology");
    } else {
      dispatch(createUser({name, phone, email, age, gender, address, birthDate}));
    }

    hasCreated();

    setName("");
    setAge(0);
    setGender("Male");
    setPhone("");
    setAddress("");
    setBirthDate("");
  }

  return (
    < >
      <h1>EMAIL: {email}</h1>
      <form onSubmit={handleCreate}>
        <label>{!isStuff ? "User name" : "Stuff Name"}</label>
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Name"/>

        <label>Phone</label>
        <input type="text" onChange={(e) => setPhone(e.target.value)} value={phone} placeholder="Phone number"/>

        <label>Age</label>
        <input type="number" onChange={(e) => setAge(e.target.value)} value={age}/>

        <label>Gender</label>
        <select onChange={(e) => setGender(e.target.value)} value={gender}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* {!isStuff && (<>
          <label>Email</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Name"/>
        </>)} */}

        <label>Address</label>
        <textarea onChange={(e) => setAddress(e.target.value)} value={address} placeholder="Register your address number"/>

        <label>Birth of Date</label>
        <input type="date" onChange={(e) => setBirthDate(e.target.value)} value={birthDate}/>

        {isStuff && (<>
          <label>Position</label>
          <select onChange={(e) => setPosition(e.target.value)} value={position}>
            <option value="Registered Nurse">General Practitioner</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Medical Assistant">Medical Assistant</option>
            <option value="Surgical Tech">Surgical Tech</option>
            <option value="Pharmacy Tech">Pharmacy Tech</option>
          </select>

          <label>Specialist</label>
          <select onChange={(e) => setSpecialist(e.target.value)} value={specialist}>
            <option value="Endocrinologist">Endocrinologist</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>

          <label>Department</label>
          <select onChange={(e) => setDepartment(e.target.value)} value={department}>
            <option value="Endocrinology">Endocrinology</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Gastroenterology">Gastroenterology</option>
          </select>
        </>)}

        <button type="submit">Create User</button>
      </form>
    </>
  )
}

const RegisterNewAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = getAuth();
  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword)
      return alert("Passwords do not match");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    < >
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <label>Email</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)}/>

        <label>Password</label>
        <input type="text" onChange={(e) => setPassword(e.target.value)}/>

        <label>Confirm Password</label>
        <input type="text" onChange={(e) => setConfirmPassword(e.target.value)}/>

        <button type="submit">Submit</button>
      </form>
    </>
  )
}

const Signup = () => {
  const { currentUser } = useContext(AuthContext);
  const [ isCreated, setIsCreated ] = useState(false);
  const stuff = useSelector((state) => state.stuffsData.stuffs);
  const user = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) return;

    const isStuff = isHealthcareEmail(currentUser.email);

    // console.log("User: ", user);
    // console.log("Stuff: ", stuff);
    
    // if (isStuff && stuff.length === 0){
    //   console.log("Hello");
    //   dispatch(fetchStuff(currentUser.email))
    // }

    // if (!isStuff && user.length === 0){
    //   dispatch(fetchUserDetail(currentUser.email));
    // }

    // if (stuff.length !== 0 || user.length === 0) {
      if (isStuff && currentUser.email == stuff[0]?.email) {
        console.log('IS A STUFF'); //Migrate to stuff dashboard
      } else if (!isStuff && currentUser.email == user[0]?.email)  {
        console.log('IS A USER'); //Migrate to user dashboard
      }
    // }

    //stuff, user, dispatch
  }, [currentUser])
  
  return (
    < >
      {!currentUser 
        ? <RegisterNewAccount /> 
        : <CreateInfo 
            isStuff={isHealthcareEmail(currentUser.email)} 
            registerEmail={currentUser.email}
            hasCreated={() => {setIsCreated(true)}}
          />
      }
    </>
  )
}

export default Signup;