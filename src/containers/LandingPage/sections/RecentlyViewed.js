import React from 'react';
import './RecentlyViewed.css';
import { FaHeart } from 'react-icons/fa';

function RecentlyViewed(props) {
  const Section3Item = () => {
    return (
      <div className="item-card">
        <div className="thumbnail">
          <FaHeart className="heart" />
          <img src="/static/images/bag.png" alt="club1" />
        </div>
        <div className="detail">
          <h4>Full Set: TaylorMade + 4 Brands</h4>
          <p>Scottsdale, AZ</p>
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

export default RecentlyViewed;
