import React, { useState, useEffect } from 'react';

function CurrentDateTime() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div>
      <h1>Current Date and Time</h1>
      <p>{currentDateTime.toLocaleString()}</p>
    </div>
  );
}

export default CurrentDateTime;
