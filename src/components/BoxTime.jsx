
const BoxTime = ({time, meridiem, hasBooked, onInteract}) => {
  const handleInteraction = () => {
    onInteract(time);
  }
  
  return (
    < >
      <div onClick={onInteract}>
        <p>{time} - {time + 2} {meridiem}</p>
      </div>
    </>
  )
}

export default BoxTime;