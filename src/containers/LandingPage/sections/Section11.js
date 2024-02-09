import React from 'react';
import './Section11.css';

function Section11(props) {
  const clubs = [
    {
      location: 'Alabama',
      avaialblePackages: 12,
    },
    {
      location: 'Alaska',
      avaialblePackages: 12,
    },
    {
      location: 'Arizona',
      avaialblePackages: 12,
    },
    {
      location: 'Arkansas',
      avaialblePackages: 12,
    },
    {
      location: 'California',
      avaialblePackages: 12,
    },
    {
      location: 'Colorado',
      avaialblePackages: 12,
    },
    {
      location: 'Connecticut',
      avaialblePackages: 12,
    },
    {
      location: 'Delaware',
      avaialblePackages: 12,
    },
    {
      location: 'Florida',
      avaialblePackages: 12,
    },
    {
      location: 'Georgia',
      avaialblePackages: 12,
    },
    {
      location: 'Hawaii',
      avaialblePackages: 12,
    },
    {
      location: 'Idaho',
      avaialblePackages: 12,
    },
    {
      location: 'Illinois',
      avaialblePackages: 12,
    },
    {
      location: 'Indiana',
      avaialblePackages: 12,
    },
    {
      location: 'Iowa',
      avaialblePackages: 12,
    },
    {
      location: 'Kansas',
      avaialblePackages: 12,
    },
    {
      location: 'Kentucky',
      avaialblePackages: 12,
    },
    {
      location: 'Louisiana',
      avaialblePackages: 12,
    },
    {
      location: 'Maine',
      avaialblePackages: 12,
    },
    {
      location: 'Maryland',
      avaialblePackages: 12,
    },
    {
      location: 'Massachusetts',
      avaialblePackages: 12,
    },
    {
      location: 'Michigan',
      avaialblePackages: 12,
    },
    {
      location: 'Minnesota',
      avaialblePackages: 12,
    },
    {
      location: 'Mississippi',
      avaialblePackages: 12,
    },
    {
      location: 'Missouri',
      avaialblePackages: 12,
    },
    {
      location: 'Montana',
      avaialblePackages: 12,
    },
    {
      location: 'Nebraska',
      avaialblePackages: 12,
    },
  ];

  return (
    <div className="section11 n-container">
      <h2>Explore Clubs By State</h2>
      <div className="items">
        {clubs.map((club, index) => {
          return (
            <div key={index} className="item">
              <h5>{club.location}</h5>
              <p>{club.avaialblePackages} Available Packages</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Section11;
