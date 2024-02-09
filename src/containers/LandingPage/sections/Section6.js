import React from 'react';
import './Section6.css';

function Section6(props) {
  return (
    <div className="section6 n-container">
      <div className="detail">
        <h2>Book your clubs for your next Golf Trip for the group with WedgeAway.</h2>
        <p>
          Booking for the entire group is easy with WedgeAway! Just select our group rental option,
          and add all of the club rentals you’d like to your cart at once. For group rentals of 10
          set or more, we offer free delivery to your hotel, AirBnb or course of your choice in the
          area.
        </p>
        <button>Book Your Group Trip Now</button>
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
