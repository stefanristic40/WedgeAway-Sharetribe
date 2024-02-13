import React from 'react';
import './PopularBrands.css';

function PopularBrands(props) {
  return (
    <div className="section9 n-container">
      <h1>View Clubs Based on Popular Brands</h1>
      <div className="brands">
        <img src="/static/images/brands/logo1.png" alt="line" />
        <img src="/static/images/brands/logo2.png" alt="line" />
        <img src="/static/images/brands/logo3.png" alt="line" />
        <img src="/static/images/brands/logo4.png" alt="line" />
        <img src="/static/images/brands/logo5.png" alt="line" />
      </div>
    </div>
  );
}

export default PopularBrands;
