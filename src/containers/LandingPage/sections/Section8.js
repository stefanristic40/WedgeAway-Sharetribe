import React from 'react';
import './Section8.css';

function Section8(props) {
  return (
    <div className="section8 n-container">
      <div className="detail">
        <p>FOR CLUB OWNERS</p>
        <h2>Earn money from your clubs & Join the WedgeAway Community</h2>
        <ul>
          <li>Host verified renter using your clubs</li>
          <li>List for free and earn up to $20,000 per year.</li>
          <li>Stay 100% in control of your schedule.</li>
        </ul>
        <button>Learn More</button>
      </div>
      <div className="gallery">
        <img src="/static/images/gal8.png" alt="line" style={{ width: '100%' }} />
        <img src="/static/images/gal9.png" alt="line" style={{ width: '100%' }} />
        <img src="/static/images/gal10.png" alt="line" style={{ width: '100%' }} />
        <img src="/static/images/gal11.png" alt="line" style={{ width: '100%' }} />
      </div>
    </div>
  );
}

export default Section8;
