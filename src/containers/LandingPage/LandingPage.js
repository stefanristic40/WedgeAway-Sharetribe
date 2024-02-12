import React from 'react';
import loadable from '@loadable/component';

import { bool, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { camelize } from '../../util/string';
import { propTypes } from '../../util/types';

import FallbackPage from './FallbackPage';
import { ASSET_NAME } from './LandingPage.duck';

import Section1 from './sections/Section1';
import Section2 from './sections/Section2';
import Section3 from './sections/Section3';
import Reviews from './sections/Reviews';
import Section5 from './sections/Section5';
import Section6 from './sections/Section6';
import Section7 from './sections/Section7';
import Section8 from './sections/Section8';
import Section9 from './sections/Section9';
import SearchCourse from './sections/SearchCourse';
import Section11 from './sections/Section11';

const PageBuilder = loadable(() =>
  import(/* webpackChunkName: "PageBuilder" */ '../PageBuilder/PageBuilder')
);

export const LandingPageComponent = props => {
  const { pageAssetsData, inProgress, error } = props;

  // const pageData = pageAssetsData?.[camelize(ASSET_NAME)]?.data;

  const customSections = [
    {
      sectionType: 'section1',
      sectionId: 'section1',
      title: 'Section 1',
    },
    {
      sectionType: 'section2',
      sectionId: 'section2',
      title: 'Section 2',
    },
    {
      sectionType: 'section3',
      sectionId: 'section3',
      title: 'Section 3',
    },
    {
      sectionType: 'Reviews',
      sectionId: 'Reviews',
      title: 'Reviews',
    },
    {
      sectionType: 'section5',
      sectionId: 'section5',
      title: 'Section 5',
    },
    {
      sectionType: 'section6',
      sectionId: 'section6',
      title: 'Section 6',
    },
    {
      sectionType: 'section7',
      sectionId: 'section7',
      title: 'Section 7',
    },
    {
      sectionType: 'section8',
      sectionId: 'section8',
      title: 'Section 8',
    },
    {
      sectionType: 'section9',
      sectionId: 'section9',
      title: 'Section 9',
    },
    {
      sectionType: 'SearchCourse',
      sectionId: 'SearchCourse',
      title: 'SearchCourse',
    },
    {
      sectionType: 'section11',
      sectionId: 'section11',
      title: 'Section 11',
    },
  ];

  return (
    <PageBuilder
      pageAssetsData={{
        sections: customSections,
      }}
      inProgress={inProgress}
      options={{
        sectionComponents: {
          section1: { component: Section1 },
          section2: { component: Section2 },
          section3: { component: Section3 },
          Reviews: { component: Reviews },
          section5: { component: Section5 },
          section6: { component: Section6 },
          section7: { component: Section7 },
          section8: { component: Section8 },
          section9: { component: Section9 },
          SearchCourse: { component: SearchCourse },
          section11: { component: Section11 },
        },
      }}
      error={error}
      fallbackPage={<FallbackPage error={error} />}
    />
  );
};

LandingPageComponent.propTypes = {
  pageAssetsData: object,
  inProgress: bool,
  error: propTypes.error,
};

const mapStateToProps = state => {
  const { pageAssetsData, inProgress, error } = state.hostedAssets || {};
  return { pageAssetsData, inProgress, error };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(connect(mapStateToProps))(LandingPageComponent);

export default LandingPage;
