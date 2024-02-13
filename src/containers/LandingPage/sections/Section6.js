import React from 'react';
import './Section6.css';

function Section6(props) {
  return (
    <div className="section6 n-container">
      <div className="detail">
        <h2>Book your clubs for everyone on your next golf trip with WedgeAway.</h2>
        <p>
          Have a group going on a trip? There’s options for everyone. Fit the needs of your entire
          group no matter what brand, models or set you’re looking for.
        </p>
        <button>Browse Thousands of Rentals</button>
      </div>
      <div className="gallery">
        <img src="/static/images/1.png" alt="line" style={{ width: '100%' }} />
        <img src="/static/images/2.png" alt="line" style={{ width: '100%' }} />
        <img src="/static/images/3.png" alt="line" style={{ width: '100%' }} />
        <img src="/static/images/4.png" alt="line" style={{ width: '100%' }} />
      </div>
    </div>
  );
}

export default Section6;
