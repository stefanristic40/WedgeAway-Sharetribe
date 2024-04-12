import React from 'react';
import css from './Question.module.css';
import { NamedLink } from '../../../components';
import { FormattedMessage } from '../../../util/reactIntl';

function Question(props) {
  return (
    <div className={css.questionContainer}>
      <div className="n-container">
        <div className={css.questionContent}>
          <p className={css.title}>Questions?</p>
          <div className={css.inputContainer}>
            <input placeholder='Email*' className={css.inputContent}/>
            <input placeholder='Are You a Host or Renter?' className={css.inputContent}/>
            <input placeholder='What Can We Help With?*' className={css.inputContent}/>
          </div>
          <NamedLink className={css.listBtn} name="NewListingPage">
            <FormattedMessage id="WedgeAwayPage.Submit" />
          </NamedLink>
        </div>
      </div>
    </div>
  );
}

export default Question;
