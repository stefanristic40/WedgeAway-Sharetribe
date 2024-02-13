import React from 'react';
import css from './PopularBrands.module.css';

function PopularBrands(props) {
  return (
    <div className="n-container">
      <div className={css.section9}>
        <h1>View Clubs Based on Popular Brands</h1>
        <div className={css.brands}>
          <img src="/static/images/brands/logo1.png" alt="line" />
          <img src="/static/images/brands/logo2.png" alt="line" />
          <img src="/static/images/brands/logo3.png" alt="line" />
          <img src="/static/images/brands/logo4.png" alt="line" />
          <img src="/static/images/brands/logo5.png" alt="line" />
        </div>
      </div>
    </div>
  );
}

export default PopularBrands;
