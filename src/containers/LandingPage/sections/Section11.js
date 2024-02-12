import React from 'react';
import './Section11.css';

function Section11(props) {
  const clubs = [
    {
      location: 'Alabama',
      avaialblePackages: 12,
      link: '/us/alabama',
    },
    {
      location: 'Alaska',
      avaialblePackages: 12,
      link: '/us/alaska',
    },
    {
      location: 'Arizona',
      avaialblePackages: 12,
      link: '/us/arizona',
    },
    {
      location: 'Arkansas',
      avaialblePackages: 12,
      link: '/us/arkansas',
    },
    {
      location: 'California',
      avaialblePackages: 12,
      link: '/us/california',
    },
    {
      location: 'Colorado',
      avaialblePackages: 12,
      link: '/us/colorado',
    },
    {
      location: 'Connecticut',
      avaialblePackages: 12,
      link: '/us/connecticut',
    },
    {
      location: 'Delaware',
      avaialblePackages: 12,
      link: '/us/delaware',
    },
    {
      location: 'Florida',
      avaialblePackages: 12,
      link: '/us/florida',
    },
    {
      location: 'Georgia',
      avaialblePackages: 12,
      link: '/us/georgia',
    },
    {
      location: 'Hawaii',
      avaialblePackages: 12,
      link: '/us/hawaii',
    },
    {
      location: 'Idaho',
      avaialblePackages: 12,
      link: '/us/idaho',
    },
    {
      location: 'Illinois',
      avaialblePackages: 12,
      link: '/us/illinois',
    },
    {
      location: 'Indiana',
      avaialblePackages: 12,
      link: '/us/indiana',
    },
    {
      location: 'Iowa',
      avaialblePackages: 12,
      link: '/us/iowa',
    },
    {
      location: 'Kansas',
      avaialblePackages: 12,
      link: '/us/kansas',
    },
    {
      location: 'Kentucky',
      avaialblePackages: 12,
      link: '/us/kentucky',
    },
    {
      location: 'Louisiana',
      avaialblePackages: 12,
      link: '/us/louisiana',
    },
    {
      location: 'Maine',
      avaialblePackages: 12,
      link: '/us/maine',
    },
    {
      location: 'Maryland',
      avaialblePackages: 12,
      link: '/us/maryland',
    },
    {
      location: 'Massachusetts',
      avaialblePackages: 12,
      link: '/us/massachusetts',
    },
    {
      location: 'Michigan',
      avaialblePackages: 12,
      link: '/us/michigan',
    },
    {
      location: 'Minnesota',
      avaialblePackages: 12,
      link: '/us/minnesota',
    },
    {
      location: 'Mississippi',
      avaialblePackages: 12,
      link: '/us/mississippi',
    },
    {
      location: 'Missouri',
      avaialblePackages: 12,
      link: '/us/missouri',
    },
    {
      location: 'Montana',
      avaialblePackages: 12,
      link: '/us/montana',
    },
    {
      location: 'Nebraska',
      avaialblePackages: 12,
      link: '/us/nebraska',
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
              {/* <p>{club.avaialblePackages} Available Packages</p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Section11;
