import React from 'react';
import css from './SearchCourse.module.css';

function SearchCourse(props) {
  return (
    <div className="n-container">
      <div className={css.searchCourse}>
        <div>
          <h3>
            Looking To Rent Clubs By Courses You’re Playing? Search Thousands of Courses to Find
            Club Rentals Nearby
          </h3>
        </div>
        <input className={css.search} type="text" placeholder="Search by Course" />
      </div>
    </div>
  );
}

export default SearchCourse;
