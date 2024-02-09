import React from 'react';
import './Section1.css';

function Section1(props) {
  return (
    <div className="landing-bg">
      <div className="landing-bg-container">
        <h1>
          Rent The Perfect Set <br /> From Local Golfers on Demand
        </h1>
        <img src="/static/images/line.png" alt="line" style={{ width: '100%' }} />
        <p>
          Discover and book golf sets and clubs from local golfers who share your passion for the
          game & a quality set of clubs
        </p>
        <div className="items">
          <div>
            <img src="/static/images/location.png" alt="location" height={40} />
            <p>Location</p>
          </div>
          <div>
            <img src="/static/images/brand.png" alt="location" height={40} />
            <p>Brand</p>
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by State, City or Course"
            className="search-input"
          />
        </div>
      </div>

      <div className="landing-bg-footer">
        <p>As seen on:</p>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
          <p>Golf Digest</p>
          <p>LINKS Magazine</p>
          <p>LIV Golf</p>
          <p>Golf Monthly</p>
          <p>TaylorMade</p>
        </div>
      </div>
    </div>
  );
}

export default Section1;
