import React, { useEffect } from 'react';
import css from './Section1.module.css';
import Search from '../../../components/SearchForm/Search';

export const LandingComponent = props => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const headerSearchElement = document.getElementById('header_search');
      // const headerMobileSearchElement = document.getElementById('mobile_search_form');

      if (headerSearchElement) {
        if (scrollPosition < 400) {
          // headerMobileSearchElement.style.display = 'none';
          headerSearchElement.style.display = 'none';
        } else {
          // headerMobileSearchElement.style.display = 'block';
          headerSearchElement.style.display = 'block';
        }
      }
    };

    setTimeout(() => {
      handleScroll();
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={css.landing_bg}>
      <div className={css.landing_container}>
        <h1 className={css.title}>
          <b>
            Rent The Perfect Clubs <br />
            From Local Golfers on Demand
          </b>
        </h1>
        <img src="/static/images/line.png" alt="line" className={css.line} />
        <p className={css.description}>
          Discover and book golf clubs from local golfers <br />
          who share your passion for the game
        </p>
        <div className={css.search_section}>
          <Search />
        </div>
      </div>
    </div>
  );
};

export default LandingComponent;
