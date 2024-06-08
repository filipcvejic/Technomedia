import React, { useEffect, useState } from "react";
import "./MockupTimer.css";

function MockupTimer() {
  const calculateRemainingTime = () => {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(24, 0, 0, 0);
    const remainingTimeInSeconds = Math.floor((endOfDay - now) / 1000);

    const hours = Math.floor(remainingTimeInSeconds / 3600);
    const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
    const seconds = remainingTimeInSeconds % 60;

    return { hours, minutes, seconds };
  };

  const [timer, setTimer] = useState(calculateRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer">
      <span>{timer.hours < 10 ? "0" + timer.hours : timer.hours}</span>
      <span>:</span>
      <span>{timer.minutes < 10 ? "0" + timer.minutes : timer.minutes}</span>
      <span>:</span>
      <span>{timer.seconds < 10 ? "0" + timer.seconds : timer.seconds}</span>
    </div>
  );
}

export default MockupTimer;
