import { createUser } from "../../features/usersSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const NewUser = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const dispatch = useDispatch();

  const handleCreate =  async (e) => {
    e.preventDefault();

    console.log(birthDate);
    dispatch(createUser({name, phone, email, age, gender, address, birthDate}));

    setName("");
    setAge(0);
    setGender("");
    setEmail("");
    setPhone("");
    setAddress("");
    setBirthDate("");
  }
  
  return (
    < >
      <form onSubmit={handleCreate}>
        <label>Username</label>
        <input type="text" onChange={(e) => setName(e.target.value)}/>

        <label>Phone</label>
        <input type="text" onChange={(e) => setPhone(e.target.value)}/>

        <label>Email</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)}/>

        <label>Age</label>
        <input type="number" onChange={(e) => setAge(e.target.value)}/>

        <label>Gender</label>
        <select onChange={(e) => setGender(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
 
        <label>Address</label>
        <textarea onChange={(e) => setAddress(e.target.value)} />

        <label>Birth of Date</label>
        <input type="date" onChange={(e) => setBirthDate(e.target.value)}/>
        
        <input type="submit">Create User</input>
      </form>
    </>
  )
};

export default NewUser;
