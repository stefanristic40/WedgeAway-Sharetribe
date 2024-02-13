import React from 'react';
import css from './RecentlyViewed.module.css';
import { FaHeart } from 'react-icons/fa';

function RecentlyViewed(props) {
  const Section3Item = () => {
    return (
      <div className={css.item}>
        <div className={css.thumbnail}>
          <FaHeart className={css.heart} />
          <img src="/static/images/bag.png" className={css.thumbnail_img} alt="club1" />
        </div>
        <div className={css.detail}>
          <h4>Full Set: TaylorMade + 4 Brands</h4>
          <p>Scottsdale, AZ</p>
          <p>TaylorMade, Full Set in Scottsdale, AZ</p>
          <p>Price $55 / Day</p>
          <p>5 Days</p>
        </div>
      </div>
    );
  };

  return (
    <div className="n-container">
      <div className={css.section3}>
        <h1>Recently viewed</h1>
        <div className={css.items}>
          <Section3Item />
          <Section3Item />
          <Section3Item />
        </div>
      </div>
    </div>
  );
}

export default RecentlyViewed;
