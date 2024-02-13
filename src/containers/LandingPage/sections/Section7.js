import React from 'react';
import css from './Section7.module.css';

function Section7() {
  return (
    <div className={css.section7}>
      <div className="n-container">
        <h1>It’s Prime Golf Season for These Warm Destinations</h1>
        <div className={css.items}>
          <div className={css.item}>
            <img
              className={css.season_img}
              src="/static/images/locations/florida.png"
              alt="florida"
            />
            <h3>Florida</h3>
          </div>
          <div className={css.item}>
            <img
              className={css.season_img}
              src="/static/images/locations/lasvegas.png"
              alt="lasvegas"
            />
            <h3>Las Vegas</h3>
          </div>
          <div className={css.item}>
            <img
              className={css.season_img}
              src="/static/images/locations/hawaii.png"
              alt="hawaii"
            />
            <h3>Hawaii</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section7;
