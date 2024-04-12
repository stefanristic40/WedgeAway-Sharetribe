import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { injectIntl } from '../../util/reactIntl';
import { Page, LayoutSingleColumn } from '../../components';

import TopbarContainer from '../../containers/TopbarContainer/TopbarContainer';
import FooterContainer from '../../containers/FooterContainer/FooterContainer';

import css from './LandingPage.module.css';
import TrustedPartner from './Sections/TrustedPartner';
import StartEarning from './Sections/StartEarning';
import Faqs from './Sections/Faqs';

export const LandingPageComponent = props => {
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
          <TrustedPartner />
          <StartEarning />
          <Faqs />
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

LandingPageComponent.defaultProps = {};

LandingPageComponent.propTypes = {};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({});

const LandingPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(LandingPageComponent);

export default LandingPage;
