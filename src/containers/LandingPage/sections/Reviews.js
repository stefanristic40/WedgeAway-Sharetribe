import React, { useState } from 'react';
import css from './Reviews.module.css';

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

  const ReviewItem = ({ review }) => {
    return (
      <div className={css.item}>
        <img src="/static/images/quote.svg" alt="quote" />
        <div className="detail">
          <p>"{review.description}"</p>
        </div>
        <div className={css.user_sec}>
          <img src={review.image} alt="review" className={css.avatar} />
          <div className={css.user_info}>
            <p className={css.name}>{review.name}</p>
            <p>{review.locaiton}</p>
            <div className={css.stars}>
              <img src="/static/images/star.png" alt="star" className={css.star} />
              <img src="/static/images/star.png" alt="star" className={css.star} />
              <img src="/static/images/star.png" alt="star" className={css.star} />
              <img src="/static/images/star.png" alt="star" className={css.star} />
              <img src="/static/images/star.png" alt="star" className={css.star} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={css.reviews}>
      <div className="n-container">
        <div className={css.title_bar}>
          <h1>Join thousands of Golfers enjoying WedgeAway.</h1>
          <div className={css.slide_controller}>
            <button onClick={handlePrev}> {'<'} </button>
            <button onClick={handleNext}> {'>'} </button>
          </div>
        </div>
        <div className={css.items}>
          {displayedReviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
