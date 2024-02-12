import React, { useState } from 'react';
import './Reviews.css';

function Reviews(props) {
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
    {
      description:
        'As a weekend golfer, I wanted quality clubs without the commitment of buying. WedgeAway was a game-changer! The clubs I rented were top-notch and in fantastic condition. The ease of booking and customer service was like a breath of fresh air. Delivered right to my local course, too! Will definitely be using WedgeAway for all my golf outings.',
      name: 'Smart W',
      locaiton: 'Holmberg Farms in Bristow, NE',
      star: 5,
      image: '/static/images/reviews/3.png',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
  };

  const displayedReviews = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
  ];

  return (
    <div className="reviews n-container">
      <div className="title-bar">
        <h1>Join thousands of Golfers enjoying WedgeAway.</h1>
        <div className="slide-controller">
          <button onClick={handlePrev}> {'<'} </button>
          <button onClick={handleNext}> {'>'} </button>
        </div>
      </div>
      <div className="items">
        {displayedReviews.map((review, index) => (
          <div key={index} className="review-card">
            <img src="/static/images/quote.svg" alt="quote" />
            <div className="detail">
              <p>"{review.description}"</p>
            </div>
            <div className="user-sec">
              <img src={review.image} alt="review" />
              <div className="user-info">
                <p className="name">{review.name}</p>
                <p>{review.locaiton}</p>
                <div className="stars">
                  <img src="/static/images/star.png" alt="star" />
                  <img src="/static/images/star.png" alt="star" />
                  <img src="/static/images/star.png" alt="star" />
                  <img src="/static/images/star.png" alt="star" />
                  <img src="/static/images/star.png" alt="star" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
