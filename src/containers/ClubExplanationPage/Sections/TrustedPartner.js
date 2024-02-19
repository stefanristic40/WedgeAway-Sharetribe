import React from 'react';
import css from './TrustedPartner.module.css';
import { NamedLink } from '../../../components';
import { FormattedMessage } from '../../../util/reactIntl';

function TrustedPartner(props) {
  return (
    <div className={css.trustedPartnerContanier}>
      <div className="n-container">
        <div className={css.trustedPartnerContent}>
          <div className={css.leftSection}>
            <h2 className={css.subTitle}>Your Trusted Partner for</h2>
            <h1 className={css.title}>
              Golf Club
              <br /> Rental Income
            </h1>
            <img src="/static/images/line.png" alt="line" className={css.trustedPartnerLine} />
            <p className={css.description}>
              Join thousands of golfers earning income from renting their clubs to passionate
              renters that share the love for the game.
            </p>

            <NamedLink className={css.listBtn} name="NewListingPage">
              <FormattedMessage id="ListingPage.CreateYourListing" />
            </NamedLink>
          </div>
          <div className={css.rightSection}>
            <img src="/static/images/golfer-back.png" alt="golf club" className={css.heroImg} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrustedPartner;
