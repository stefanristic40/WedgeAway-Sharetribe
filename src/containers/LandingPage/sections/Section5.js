import React from 'react';
import css from './Section5.module.css';

import { FaHeart } from 'react-icons/fa';

function Section5(props) {
  const Item = () => {
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
      <div className={css.section5}>
        <h1>Clubs for Rent near Los Angeles, CA</h1>
        <p>Not your location? See spots near you.</p>

        <div className={css.items}>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
        <div>
          <button className={css.view_more_btn}>View More</button>
        </div>
      </div>
    </div>
  );
}

export default Section5;
