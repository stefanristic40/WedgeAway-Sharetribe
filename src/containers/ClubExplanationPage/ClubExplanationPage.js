import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { injectIntl } from '../../util/reactIntl';
import { Page, LayoutSingleColumn } from '../../components';

import TopbarContainer from '../../containers/TopbarContainer/TopbarContainer';
import FooterContainer from '../../containers/FooterContainer/FooterContainer';

import css from './ClubExplanationPage.module.css';
import TrustedPartner from './Sections/TrustedPartner';
import StartEarning from './Sections/StartEarning';
import Faqs from './Sections/Faqs';

export const ClubExplanationPageComponent = props => {
  return (
    <Page className={css.root} scrollingDisabled={false}>
      <LayoutSingleColumn
        topbar={
          <>
            <TopbarContainer currentPage="ClubExplanationPage" />
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

ClubExplanationPageComponent.defaultProps = {};

ClubExplanationPageComponent.propTypes = {};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({});

const ClubExplanationPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(ClubExplanationPageComponent);

export default ClubExplanationPage;
