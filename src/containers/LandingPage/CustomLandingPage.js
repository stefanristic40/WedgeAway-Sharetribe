import React, { useState } from 'react';
import Slider from 'react-slick';

import './CustomLandingPage.css';

import TopbarSearchForm from '../TopbarContainer/Topbar/TopbarSearchForm/TopbarSearchForm';
import { datPath } from 'full-icu';
import Section8 from './sections/Section8';

function CustomLandingPage(props) {
  const Section3Item = () => {
    return (
      <div className="item-card">
        <div className="thumbnail">
          <img src="/static/images/bag.png" alt="club1" />
        </div>
        <div className="detail">
          <h4>Callaway XR 16</h4>
          <p>TaylorMade, Full Set in Scottsdale, AZ</p>
          <p>Price $55 / Day</p>
          <p>5 Days</p>
        </div>
      </div>
    );
  };

  var reviewSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const reviews = [
    {
      description:
        'As a weekend golfer, I wanted quality clubs without the commitment of buying. WedgeAway was a game-changer! The clubs I rented were top-notch and in fantastic condition. The ease of booking and customer service was like a breath of fresh air. Delivered right to my local course, too! Will definitely be using WedgeAway for all my golf outings.',
      name: 'Lee W',
      locaiton: 'Holmberg Farms in Bristow, NE',
      star: 5,
      image: '/static/images/reviews/1.png',
    },
    {
      description:
        'As a weekend golfer, I wanted quality clubs without the commitment of buying. WedgeAway was a game-changer! The clubs I rented were top-notch and in fantastic condition. The ease of booking and customer service was like a breath of fresh air. Delivered right to my local course, too! Will definitely be using WedgeAway for all my golf outings.',
      name: 'Lee W',
      locaiton: 'Holmberg Farms in Bristow, NE',
      star: 5,
      image: '/static/images/reviews/2.png',
    },
    {
      description:
        'As a weekend golfer, I wanted quality clubs without the commitment of buying. WedgeAway was a game-changer! The clubs I rented were top-notch and in fantastic condition. The ease of booking and customer service was like a breath of fresh air. Delivered right to my local course, too! Will definitely be using WedgeAway for all my golf outings.',
      name: 'Lee W',
      locaiton: 'Holmberg Farms in Bristow, NE',
      star: 5,
      image: '/static/images/reviews/3.png',
    },
  ];

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
      <div className="section2">
        <p>WedgeAway offers thousands of golf club sets from local golfers across the U.S.</p>
      </div>
      <div className="section3 n-container">
        <h1>Recently viewed</h1>
        <div className="items">
          <Section3Item />
          <Section3Item />
          <Section3Item />
        </div>
      </div>
      <div className="section4 n-container">
        <div className="title-bar">
          <h1>Join thousands of Golfers enjoying WedgeAway.</h1>
          <div className="slide-controller">
            <button> {`<`} </button>
            <button> {`>`} </button>
          </div>
        </div>
        <div className="items">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <img src="/static/images/quote.svg" alt="quote" />
              <div className="detail">
                <p>"{review.description}"</p>
              </div>
              <div className="user-sec">
                <img src={review.image} alt="review" />
                <div className="user-info">
                  <p>{review.name}</p>
                  <p>{review.locaiton}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section5 n-container">
        <h1>Clubs for Rent near Los Angeles, CA</h1>
        <p>Not your location? See spots near you.</p>

        <div className="items"></div>
      </div>

      <Section8 />
      <Section9 />
      <Section10 />
      <Section11 />
    </div>
  );
}

export default CustomLandingPage;
