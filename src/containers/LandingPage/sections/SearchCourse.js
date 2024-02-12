import React from 'react';
import './SearchCourse.css';

function SearchCourse(props) {
  return (
    <div className="searchCourse n-container">
      <div>
        <h3>
          Looking For Clubs By Courses You’re Playing At? Search thousands of courses to find what
          you’re looking for
        </h3>
      </div>
      <div className="search">
        <input type="text" placeholder="Search by Course" />
      </div>
    </div>
  );
}

export default SearchCourse;
