import React from 'react';
import './Section3.css';

function Section3(props) {
  const Section3Item = () => {
    return (
      <div className="item-card">
        <div className="thumbnail">
          <img src="/static/images/bag.png" alt="club1" />
        </div>
        <div className="detail">
          <h4>Callaway XR 16</h4>
          <p>TaylorMade, Full Set in Scottsdale, AZ</p>
          <p>Price $55 / Day</p>
          <p>5 Days</p>
        </div>
      </div>
    );
  };

  return (
    <div className="section3 n-container">
      <h1>Recently viewed</h1>
      <div className="items">
        <Section3Item />
        <Section3Item />
        <Section3Item />
      </div>
    </div>
  );
}

export default Section3;
