import React, { useState, useEffect } from 'react';
import './styles.css';

const TimerWebsite = () => {
  const [totalTime, setTotalTime] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const startTimer = () => {
    const id = setInterval(updateTimer, 1000);
    setIntervalId(id);
  };

  const updateTimer = () => {
    if (timeRemaining <= 0) {
      clearInterval(intervalId);
      return;
    }

    const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
    const seconds = (timeRemaining % 60).toString().padStart(2, '0');

    setTimeRemaining(prevTime => prevTime - 1);
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setTimeRemaining(0);
  };

  const addTenSeconds = () => {
    if (timeRemaining <= 0) {
      setTotalTime(10);
      setTimeRemaining(10);
      startTimer();
    } else {
      setTimeRemaining(prevTime => prevTime + 10);
    }
  };

  const handleTaskClick = () => {
    const taskTime = 60;
    resetTimer();
    setTimeRemaining(taskTime);
    setTotalTime(taskTime);
    startTimer();
  };

  return (
    <div>
      <h1>Routine Starting in...</h1>
      <div className="container">
        <div className="timer-wrapper">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                transform: `rotate(${((totalTime - timeRemaining) / totalTime) * 360}deg)`
              }}
            ></div>
            <div className="timer">{`${Math.floor(timeRemaining / 60)
              .toString()
              .padStart(2, '0')}:${(timeRemaining % 60).toString().padStart(2, '0')}`}</div>
          </div>
          <div className="buttons">
            <button id="add-time" className="btn" onClick={addTenSeconds}>
              + 10 seconds
            </button>
            <button id="stop-timer" className="btn" onClick={resetTimer}>
              || Stop
            </button>
          </div>
        </div>
        <div className="task-card" id="task-card" onClick={handleTaskClick}>
          <div className="task">
            Task: Cleansing
            <br />
            <br />
            ⏱️60s
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerWebsite;
