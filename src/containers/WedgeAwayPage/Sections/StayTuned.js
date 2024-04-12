import React from 'react';
import css from './StayTuned.module.css';
import { NamedLink } from '../../../components';
import { FormattedMessage } from '../../../util/reactIntl';

function StayTuned(props) {
  return (
    <div className={css.stayTunedContainer}>
      <div className="n-container">
        <div className={css.stayTunedContent}>
          <img src="/static/images/wedgeaway/wedgetitle.png" alt="wedgetitle" className={css.wedgeAwayTitle} />
          <p className={css.title}>You’re Signed Up & Ready for Launch. Stay Tuned for More Announcements!</p>
        </div>
        <div className={css.listClubsContent}>
          <div className={css.leftSection}>
            <p className={css.subTitle}>Want to List More Clubs?</p>
            <NamedLink className={css.listBtn} name="NewListingPage">
              <FormattedMessage id="WedgeAwayPage.CreateAnotherListing" />
            </NamedLink>
          </div>
          <div className={css.rightSection}>
            <img src="/static/images/wedgeaway/1.png" alt="golf" className={css.heroImg} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StayTuned;
