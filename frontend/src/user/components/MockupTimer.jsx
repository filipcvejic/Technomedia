import React, { useEffect, useState } from "react";
import "./MockupTimer.css";

function MockupTimer() {
  const [timer, setTimer] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) {
        setTimer({
          hours: 24,
          minutes: 0,
          seconds: 0,
        });
      } else {
        setTimer((prevTimer) => {
          let { hours, minutes, seconds } = prevTimer;

          if (seconds === 0) {
            if (minutes === 0) {
              hours -= 1;
              minutes = 59;
              seconds = 59;
            } else {
              minutes -= 1;
              seconds = 59;
            }
          } else {
            seconds -= 1;
          }

          return { hours, minutes, seconds };
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

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
