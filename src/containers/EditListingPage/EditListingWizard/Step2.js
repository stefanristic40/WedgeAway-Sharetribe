import React from 'react';

const Step2 = ({ onNext, onBack }) => {
  return (
    <div>
      <label htmlFor="input3">Input 3:</label>
      <input type="text" id="input3" />

      <label htmlFor="input4">Input 4:</label>
      <input type="text" id="input4" />

      <button onClick={onBack}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default Step2;