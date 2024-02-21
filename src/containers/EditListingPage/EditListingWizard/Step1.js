import React from 'react';

const Step1 = ({ onNext }) => {
  return (
    <div>
      <label htmlFor="input1">Input 1:</label>
      <input type="text" id="input1" />

      <label htmlFor="input2">Input 2:</label>
      <input type="text" id="input2" />

      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default Step1;