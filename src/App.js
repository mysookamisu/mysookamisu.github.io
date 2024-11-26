import React, { useEffect, useState } from "react";
import jalaali from "jalaali-js";
import "./App.css";

const App = () => {
  const [showBirthdayText, setShowBirthdayText] = useState(false);


   // Iran timezone offset in minutes (UTC+3:30)
  const IRAN_TIMEZONE_OFFSET = 210;

  // Helper function to get Iran's current time
  const getIranDate = () => {
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000; // Convert to UTC
    return new Date(utcTime + IRAN_TIMEZONE_OFFSET * 60000); // Convert to Iran time
  };

  const birthdayShamsi = { year: 1381, month: 9, day: 7 }; // 7 Azar 1381
  const birthdayGregorian = jalaali.toGregorian(birthdayShamsi.year, birthdayShamsi.month, birthdayShamsi.day);

  // Current year in Shamsi calendar
  const iranDate = getIranDate();
  const currentShamsiYear = jalaali.toJalaali(iranDate).jy;

  // Calculate the number of butterflies
  const butterflyCount = currentShamsiYear - birthdayShamsi.year;
  console.log(butterflyCount)

  // Generate random positions for each butterfly
  const [butterflies, setButterflies] = useState([]);
  
  useEffect(() => {
    const generateButterflies = () => {
      const positions = Array.from({ length: butterflyCount }).map(() => ({
        top: Math.random() * 100, // Random top position (0-100%)
        left: Math.random() * 100, // Random left position (0-100%)
      }));
      setButterflies(positions);
    };
    generateButterflies();
    
  }, [butterflyCount]);

  useEffect(() => {
    const checkBirthday = () => {
      const iranDate = getIranDate();
      const currentShamsi = jalaali.toJalaali(iranDate);

      // Check if today is her birthday
      if (currentShamsi.jm === birthdayShamsi.month && currentShamsi.jd === birthdayShamsi.day) {
        setShowBirthdayText(true); // Show birthday text
      } else {
        setShowBirthdayText(false); // Show default text
      }
    };

    // Run the check once when the component mounts
    checkBirthday();

    // Optional: Re-check at midnight for live updates
    const iranDate = getIranDate();
    const midnight = new Date(iranDate);
    midnight.setHours(24, 0, 0, 0); // Set to midnight Iran time
    const timeUntilMidnight = midnight - iranDate;
    console.log(timeUntilMidnight)
    const timeout = setTimeout(() => {
      checkBirthday(); // Re-check on the next day
    }, timeUntilMidnight);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [birthdayShamsi]);

  return (
    <div className="app">
      
      <div className="butterflies">
        {butterflies?.map((position, index) => (
          <img
            key={index}
            src="butterfly.webp"
            alt="Butterfly"
            className="butterfly"
            style={{
              top: `${position.top}%`,
              left: `${position.left}%`,
            }}
          />
        ))}
      </div>
      <div className="content">
        <div className="heart" />
        <div className="text">
          {showBirthdayText ? <h1 style={{margin: '10px'}} >Happy Birthday!</h1> : <h1 style={{margin: '10px'}}>I Love You!</h1>}
          {<h1 style={{margin: 0}}>My Sookamisu!</h1>}
        </div>
        <div>
        <audio controls id="audio" autoPlay loop>
          <source src={"/merry-go-round-of-life-howls-moving-castle.mp3"} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
      </div>
      
    </div>
  );
};

export default App;
