import React from 'react';
import './Section11.css';

function Section11(props) {
  const clubs = [
    {
      location: 'Alabama',
      availablePackages: 12,
      link: '/us/alabama',
    },
    {
      location: 'Alaska',
      availablePackages: 8,
      link: '/us/alaska',
    },
    {
      location: 'Arizona',
      availablePackages: 15,
      link: '/us/arizona',
    },
    {
      location: 'Arkansas',
      availablePackages: 5,
      link: '/us/arkansas',
    },
    {
      location: 'California',
      availablePackages: 10,
      link: '/us/california',
    },
    {
      location: 'Colorado',
      availablePackages: 18,
      link: '/us/colorado',
    },
    {
      location: 'Georgia',
      availablePackages: 13,
      link: '/us/georgia',
    },
    {
      location: 'Idaho',
      availablePackages: 7,
      link: '/us/idaho',
    },
    {
      location: 'Illinois',
      availablePackages: 4,
      link: '/us/illinois',
    },
    {
      location: 'Indiana',
      availablePackages: 9,
      link: '/us/indiana',
    },
    {
      location: 'Iowa',
      availablePackages: 11,
      link: '/us/iowa',
    },
    {
      location: 'Kansas',
      availablePackages: 6,
      link: '/us/kansas',
    },
    {
      location: 'Kentucky',
      availablePackages: 14,
      link: '/us/kentucky',
    },
    {
      location: 'Louisiana',
      availablePackages: 3,
      link: '/us/louisiana',
    },
    {
      location: 'Maryland',
      availablePackages: 16,
      link: '/us/maryland',
    },
    {
      location: 'Michigan',
      availablePackages: 20,
      link: '/us/michigan',
    },
    {
      location: 'Minnesota',
      availablePackages: 5,
      link: '/us/minnesota',
    },
    {
      location: 'Mississippi',
      availablePackages: 12,
      link: '/us/mississippi',
    },
    {
      location: 'Missouri',
      availablePackages: 8,
      link: '/us/missouri',
    },
    {
      location: 'Montana',
      availablePackages: 17,
      link: '/us/montana',
    },
    {
      location: 'Nebraska',
      availablePackages: 3,
      link: '/us/nebraska',
    },
    {
      location: 'New Jersey',
      availablePackages: 11,
      link: '/us/new-jersey',
    },
    {
      location: 'New Mexico',
      availablePackages: 14,
      link: '/us/new-mexico',
    },
    {
      location: 'New York',
      availablePackages: 8,
      link: '/us/new-york',
    },
    {
      location: 'North Carolina',
      availablePackages: 13,
      link: '/us/north-carolina',
    },
    {
      location: 'North Dakota',
      availablePackages: 7,
      link: '/us/north-dakota',
    },
    {
      location: 'Ohio',
      availablePackages: 10,
      link: '/us/ohio',
    },
    {
      location: 'Oklahoma',
      availablePackages: 15,
      link: '/us/oklahoma',
    },
    {
      location: 'Oregon',
      availablePackages: 4,
      link: '/us/oregon',
    },
    {
      location: 'Pennsylvania',
      availablePackages: 18,
      link: '/us/pennsylvania',
    },
    {
      location: 'South Carolina',
      availablePackages: 9,
      link: '/us/south-carolina',
    },
    {
      location: 'South Dakota',
      availablePackages: 7,
      link: '/us/south-dakota',
    },
    {
      location: 'Tennessee',
      availablePackages: 15,
      link: '/us/tennessee',
    },
    {
      location: 'Texas',
      availablePackages: 12,
      link: '/us/texas',
    },
    {
      location: 'Utah',
      availablePackages: 11,
      link: '/us/utah',
    },
    {
      location: 'Vermont',
      availablePackages: 14,
      link: '/us/vermont',
    },
    {
      location: 'Washington',
      availablePackages: 6,
      link: '/us/washington',
    },
    {
      location: 'Wisconsin',
      availablePackages: 8,
      link: '/us/wisconsin',
    },
    {
      location: 'Wyoming',
      availablePackages: 10,
      link: '/us/wyoming',
    },
  ];

  return (
    <div className="section11">
      <div className="n-container">
        <h1>Explore Clubs By State</h1>
        <div className="items">
          {clubs.map((club, index) => {
            return (
              <div key={index} className="item">
                <h5>{club.location}</h5>
                {/* <p>{club.avaialblePackages} Available Packages</p> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Section11;
