import React, { useState } from 'react';

import './CustomLandingPage.css';

import Section4 from './sections/Section4';
import Section5 from './sections/Section5';
import Section6 from './sections/Section6';
import Section7 from './sections/Section7';
import Section8 from './sections/Section8';
import Section9 from './sections/Section9';
import Section10 from './sections/Section10';
import Section11 from './sections/Section11';
import Section3 from './sections/Section3';
import Section1 from './sections/Section1';
import Section2 from './sections/Section2';

function CustomLandingPage(props) {
  const clubs = [
    {
      image: '/static/images/bag.png',
      title: 'Callaway XR 16',
      location: 'TaylorMade, Full Set in Scottsdale, AZ',
      price: '$55 / Day',
      days: 5,
    },
    {
      image: '/static/images/bag.png',
      title: 'Callaway XR 16',
      location: 'TaylorMade, Full Set in Scottsdale, AZ',
      price: '$55 / Day',
      days: 5,
    },
    {
      image: '/static/images/bag.png',
      title: 'Callaway XR 16',
      location: 'TaylorMade, Full Set in Scottsdale, AZ',
      price: '$55 / Day',
      days: 5,
    },
    {
      image: '/static/images/bag.png',
      title: 'Callaway XR 16',
      location: 'TaylorMade, Full Set in Scottsdale, AZ',
      price: '$55 / Day',
      days: 5,
    },
    {
      image: '/static/images/bag.png',
      title: 'Callaway XR 16',
      location: 'TaylorMade, Full Set in Scottsdale, AZ',
      price: '$55 / Day',
      days: 5,
    },
    {
      image: '/static/images/bag.png',
      title: 'Callaway XR 16',
      location: 'TaylorMade, Full Set in Scottsdale, AZ',
      price: '$55 / Day',
      days: 5,
    },
  ];

  return (
    <div>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      {/* FOR CLUB OWNERS */}
      <Section8 />
      {/* View Clubs Based on Popular Brands */}
      <Section9 />
      {/* Search */}
      <Section10 />
      <Section11 />
    </div>
  );
}

export default CustomLandingPage;
