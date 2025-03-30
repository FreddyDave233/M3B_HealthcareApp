
const StuffDetail = () => {
  const personInfo = useSelector((state) => state.stuffSlice.stuffs);

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

      {/* Position Information - Stuff*/}
      {/* Position, specialist, department */}

      {/* OTHER INFORMATION BLOCK */}
      {/* LIST OF PATIENT UNDER YOUR COMMAND */}
    </>
  )
}

export default StuffDetail;