import React from 'react';
import { object } from 'prop-types';

import TopbarSearchForm from '../../TopbarContainer/Topbar/TopbarSearchForm/TopbarSearchForm';
import { useConfiguration } from '../../../context/configurationContext';
import { isMainSearchTypeKeywords, isOriginInUse } from '../../../util/search';
import { parse } from '../../../util/urlHelpers';

import css from './Section1.css';

function Section1(props) {
  const config = useConfiguration();

  const { mobilemenu, mobilesearch, keywords, address, origin, bounds } = parse(location.search, {
    latlng: ['origin'],
    latlngBounds: ['bounds'],
  });

  function handleSubmit(values) {
    const { currentSearchParams } = this.props;
    const { history, config, routeConfiguration } = this.props;

    const topbarSearchParams = () => {
      if (isMainSearchTypeKeywords(config)) {
        return { keywords: values?.keywords };
      }
      // topbar search defaults to 'location' search
      const { search, selectedPlace } = values?.location;
      const { origin, bounds } = selectedPlace;
      const originMaybe = isOriginInUse(config) ? { origin } : {};

      return {
        ...originMaybe,
        address: search,
        bounds,
      };
    };
    const searchParams = {
      ...currentSearchParams,
      ...topbarSearchParams(),
    };
    history.push(createResourceLocatorString('SearchPage', routeConfiguration, {}, searchParams));
  }

  const topbarSearcInitialValues = () => {
    if (isMainSearchTypeKeywords(config)) {
      return { keywords };
    }

    // Only render current search if full place object is available in the URL params
    const locationFieldsPresent = isOriginInUse(config)
      ? address && origin && bounds
      : address && bounds;
    return {
      location: locationFieldsPresent
        ? {
            search: address,
            selectedPlace: { address, origin, bounds },
          }
        : null,
    };
  };
  const initialSearchFormValues = topbarSearcInitialValues();

  const search = (
    <TopbarSearchForm
      className="search-div"
      desktopInputRoot="search-input"
      onSubmit={handleSubmit}
      initialValues={initialSearchFormValues}
      appConfig={config}
    />
  );

  return (
    <div className="landing-bg">
      <div className="landing-bg-container">
        <h1>
          Rent The Perfect Set <br /> From Local Golfers on Demand
        </h1>
        <img src="/static/images/line.png" alt="line" style={{ width: '100%' }} />
        <p>
          Discover and book golf sets and clubs from local golfers <br />
          who share your passion for the game
        </p>
        {/* <div className="items">
          <div>
            <img src="/static/images/location.png" alt="location" height={40} />
            <p>Location</p>
          </div>
          <div>
            <img src="/static/images/brand.png" alt="location" height={40} />
            <p>Brand</p>
          </div>
        </div> */}
        <div>
          {search}
          {/* <input
            type="text"
            placeholder="Search by State, City or Course"
            className="search-input"
          /> */}
        </div>
      </div>

      <div className="landing-bg-footer">
        <p>As seen on:</p>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
          <p>Golf Digest</p>
          <p>LINKS Magazine</p>
          <p>LIV Golf</p>
          <p>Golf Monthly</p>
          <p>TaylorMade</p>
        </div>
      </div>
    </div>
  );
}

export default Section1;

Section1.defaultProps = {
  currentSearchParams: null,
};

Section1.propTypes = {
  currentSearchParams: object,
};
