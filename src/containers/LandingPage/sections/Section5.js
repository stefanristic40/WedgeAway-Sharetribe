import React from 'react';
import './Section5.css';

function Section5(props) {
  const Item = () => {
    return (
      <div className="item">
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
    <div className="section5 n-container">
      <h1>Clubs for Rent near Los Angeles, CA</h1>
      <p>Not your location? See spots near you.</p>

      <div className="items">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
      <div>
        <button className="view-more-btn">View More</button>
      </div>
    </div>
  );
}

export default Section5;
