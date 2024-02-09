import React from 'react';
import './Section7.css';

function Section7() {
  return (
    <div className="section7 n-container">
      <h1>It’s Prime Golf Season for These Warm Destinations</h1>
      <div className="items">
        <div className="item">
          <img src="/static/images/locations/florida.png" alt="florida" />
          <h3>Florida</h3>
        </div>
        <div className="item">
          <img src="/static/images/locations/lasvegas.png" alt="lasvegas" />
          <h3>Las Vegas</h3>
        </div>
        <div className="item">
          <img src="/static/images/locations/hawaii.png" alt="hawaii" />
          <h3>Hawaii</h3>
        </div>
      </div>
    </div>
  );
}

export default Section7;
