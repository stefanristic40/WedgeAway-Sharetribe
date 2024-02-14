import React from 'react';
import css from './TrendingCourses.module.css';

function TrendingCourses(props) {
  return (
    <div className={css.trending_courses}>
      <div className="n-container">
        <h1>Trending Courses</h1>
        <div className={css.items}>
          <div className={css.item}>
            <img className={css.season_img} src="/static/images/courses/2.jpg" alt="florida" />
            <h3>Bandon Dunes Golf Resort</h3>
          </div>
          <div className={css.item}>
            <img className={css.season_img} src="/static/images/courses/3.jpg" alt="lasvegas" />
            <h3>Kohler Whistling Straits</h3>
          </div>
          <div className={css.item}>
            <img className={css.season_img} src="/static/images/courses/1.jpg" alt="hawaii" />
            <h3>Bethpage State Park</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingCourses;
