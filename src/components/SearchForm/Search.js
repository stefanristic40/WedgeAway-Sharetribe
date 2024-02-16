import React from 'react';
import { func, object, shape } from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import { useConfiguration } from '../../context/configurationContext';
import { useRouteConfiguration } from '../../context/routeConfigurationContext';

import { isMainSearchTypeKeywords, isOriginInUse } from '../../util/search';
import { parse } from '../../util/urlHelpers';
import { createResourceLocatorString } from '../../util/routes';
import SearchForm from './SearchForm/SearchForm';

export const SearchComponent = props => {
  const { currentSearchParams, history, location, ...rest } = props;

  const config = useConfiguration();
  const routeConfiguration = useRouteConfiguration();

  const { keywords, address, origin, bounds } = parse(location.search, {
    latlng: ['origin'],
    latlngBounds: ['bounds'],
  });

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

  function handleSubmit(values) {
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

  return (
    <SearchForm
      onSubmit={handleSubmit}
      initialValues={initialSearchFormValues}
      appConfig={config}
    />
  );
};

SearchComponent.defaultProps = {
  currentSearchParams: null,
};

SearchComponent.propTypes = {
  currentSearchParams: object,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({ state: object }).isRequired,
};

const Search = compose(withRouter)(SearchComponent);

export default Search;
