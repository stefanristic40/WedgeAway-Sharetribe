import React from 'react';
import css from './SearchCourse.module.css';
import { CiSearch } from 'react-icons/ci';

function SearchCourse(props) {
  return (
    <div className={css.searchCourseContainer}>
      <div className="n-container">
        <div className={css.searchCourse}>
          <div>
            <h3>
              Looking To Rent Clubs By Courses You’re Playing? Search Thousands of Courses to Find
              Club Rentals Nearby
            </h3>
          </div>
          <div className={css.search_box}>
            <input className={css.search} type="text" placeholder="Search by Course" />
            <CiSearch size={30} color="white" className={css.search_icon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCourse;
