import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { injectIntl } from '../../util/reactIntl';
import { Page, LayoutSingleColumn } from '../../components';

import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import css from './WedgeAwayPage.module.css';
import StayTuned from './Sections/StayTuned';
import Question from './Sections/Question';
// import TrustedPartner from './Sections/TrustedPartner';
// import StartEarning from './Sections/StartEarning';
// import Faqs from './Sections/Faqs';

export const WedgeAwayPageComponent = props => {
  return (
    <Page className={css.root} scrollingDisabled={false}>
      <LayoutSingleColumn
        topbar={
          <>
            <TopbarContainer currentPage="LandingPage" />
          </>
        }
        footer={<FooterContainer />}
      >
        <div className={css.content}>
          <StayTuned />
          <Question />
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

WedgeAwayPageComponent.defaultProps = {};

WedgeAwayPageComponent.propTypes = {};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({});

const WedgeAwayPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(WedgeAwayPageComponent);

export default WedgeAwayPage;
