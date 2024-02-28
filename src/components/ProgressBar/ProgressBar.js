import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import css from './ProgressBar.module.css';
const ProgressBar = ({ currentStep }) => {
  const [progress, setProgress] = useState(((currentStep - 1) / 8) * 100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((currentStep / 8) * 100); // Assuming 5 steps in total
    }, 100); // Update every 2 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [currentStep]);

  const completed = Math.floor((currentStep / 8) * 100);
  const progressBarStyle = {
    borderRadius: '5px',
    width: `${progress}%`,
    backgroundColor: 'rgb(78, 98, 40)', //4e6228 rgb(78, 98, 40)
    height: '8px',
    transition: 'width 0.5s ease-in-out', // Smooth transition over 0.5 seconds with ease-in-out timing function
  };

  return (
    <div className={css.progessShow}>
      <div className={css.progressTotal}>
        <div style={progressBarStyle}></div>
      </div>

      <div>{completed}% Complete</div>
      {/* <div>{progress}% Complete</div> */}
    </div>
  );
};

export default ProgressBar;
