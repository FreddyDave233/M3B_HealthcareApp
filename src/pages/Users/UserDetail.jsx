
const UserDetail = () => {
  const userInfo = useSelector((state) => state.users.users);
  
  return (
    < >
      {/* //Center Rounded */}
      <img /> 
      <h1>I AM NAME</h1>
      
      <h2>General Information</h2>
      <p>Age: {}</p>
      <p>Gender: {}</p>
      <p>Birth of Date: {}</p>
      <hr/>
      <p>Phone Number: {}</p>
      <p>Email: {}</p>
      
      <p>Address: {}</p>

      {/* Medication Info */}
      {/* OTHER STUFF MEMBER */}
      <h2>Medication Information</h2>
      <p>Health: </p>
      <p>Health Status: </p> 
      <p>Description: </p> 
      
      {/* Position Information - Stuff*/}
      {/* Position, specialist, department */}
      
      {/* OTHER INFORMATION BLOCK */}
    </>
  )
}

export default UserDetail;