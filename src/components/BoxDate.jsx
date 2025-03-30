import { useState, useEffect } from "react";

const BoxDate = ({ date, month, isFull, onInteract }) => {
  
  const handleInteraction = () => {
    onInteract(date);
  }
  
  return (
    < >
      <div onClick={handleInteraction}>
        <p>{month}</p>
        <p>{date}</p>
      </div>
    </>
  )
}

export default BoxDate;