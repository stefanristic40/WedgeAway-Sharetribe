import React from 'react';
import './SearchCourse.css';

function SearchCourse(props) {
  return (
    <div className="searchCourse n-container">
      <div>
        <h3>
          Looking To Rent Clubs By Courses You’re Playing? Search Thousands of Courses to Find Club
          Rentals Nearby
        </h3>
      </div>
      <div className="search">
        <input type="text" placeholder="Search by Course" />
      </div>
    </div>
  );
}

export default SearchCourse;
