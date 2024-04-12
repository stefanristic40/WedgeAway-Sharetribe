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
            <h2 className={css.subTitle}>COMING SOON</h2>
            <img src="/static/images/line.png" alt="line" className={css.trustedPartnerLine} />
            <h1 className={css.title}>
              Turn Your Golf Clubs Into Income
            </h1> 
            <div className={css.golfdollar}>
              <img src="/static/images/landing/bag.png" alt="bag" className={css.golfImg}/>
              <img src="/static/images/landing/equal.png" alt="equal" className={css.equalImg}/>
              <img src="/static/images/landing/dollar.png" alt="dollar" className={css.dollarImg}/>
            </div>           
            <p className={css.description}>
              Looking to earn income with your golf clubs?
              WedgeAway let’s golfers rent their clubs to other golfers
              all over the world. Think Airbnb, but for golf clubs!
            </p>

            <NamedLink className={css.listBtn} name="WedgeAwayPage">
              <FormattedMessage id="LandingPage.SignUp&CreateYourListing" />
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
