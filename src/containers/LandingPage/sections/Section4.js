import React from 'react';
import './Section4.css';

function Section4(props) {
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

  return (
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
  );
}

export default Section4;
