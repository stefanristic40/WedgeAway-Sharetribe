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
          <div className={css.review_score}>
            <img src="/static/images/star.png" alt="star" height={20} width={20} />
            5.0(2)
          </div>
          <h4 className={css.title}>Full Set: TaylorMade + 4 Brands</h4>
          <p style={{ textDecoration: 'underline' }}>Scottsdale, AZ</p>
          <p>SW, PW, GW, 4-9 Irons, 3 Wood, 5 Wood, Driver</p>
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
