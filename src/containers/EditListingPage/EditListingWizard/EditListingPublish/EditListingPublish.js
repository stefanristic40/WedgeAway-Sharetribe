import React from 'react';
import classNames from 'classnames';

// Import shared components
import { H3, H4, ListingLink, Button, IconCheckmark } from '../../../../components';
// import CheckMark from '../../../../assets/success-green-check-mark-icon.svg';
import ProgressBar from '../../../../components/ProgressBar/ProgressBar';

// Import configs and util modules
import { FormattedMessage } from '../../../../util/reactIntl';

import css from './EditListingPublish.module.css';
// import { GrCheckmark } from 'react-icons/gr';

const EditListingPublish = props => {
  const {
    className,
    rootClassName,
    listing,
    disabled,
    ready,
    onSubmit,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
    onPreviousTab,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  // const isPublished = listing?.id && listing?.attributes?.state !== LISTING_STATE_DRAFT;
  // const unitType = listing?.attributes?.publicData?.unitType;

  const handleSubmit = () => {
    const updateValues = { publicData: { isCompleted: true } };
    onSubmit(updateValues);
  };

  return (
    <div className={classes}>
      <ProgressBar currentStep={8} />
      <H3 as="h1">
        <FormattedMessage
          id="EditListingPublish.createListingTitle"
          values={{ lineBreak: <br /> }}
        />
      </H3>
      <div className={css.subtitlePublish}>
        You can always return later to edit any of the sections below after your clubs have been
        published.
      </div>

      <div className={css.isCompleted}>
        <img src="/checkbox.svg" alt="checkMark" className={css.checkbox} />
        <div className={css.completedItemTitle}>Location</div>
      </div>

      <div className={css.isCompleted}>
        <img src="/checkbox.svg" alt="checkMark" className={css.checkbox} />
        <div className={css.completedItemTitle}>Club Details</div>
      </div>

      <div className={css.isCompleted}>
        <img src="/checkbox.svg" alt="checkMark" className={css.checkbox} />
        <div className={css.completedItemTitle}>Club Photos</div>
      </div>

      <div className={css.isCompleted}>
        <img src="/checkbox.svg" alt="checkMark" className={css.checkbox} />
        <div className={css.completedItemTitle}>Add Ons</div>
      </div>

      <div className={css.isCompleted}>
        <img src="/checkbox.svg" alt="checkMark" className={css.checkbox} />
        <div className={css.completedItemTitle}>Rules & Cancelation Policy</div>
      </div>

      <div className={css.isCompleted}>
        <img src="/checkbox.svg" alt="checkMark" className={css.checkbox} />
        <div className={css.completedItemTitle}>Pickup & Delivery Instructions</div>
      </div>

      <div className={css.buttonItems}>
        <Button className={css.submitButton} onClick={onPreviousTab}>
          Back
        </Button>
        <Button className={css.submitButton} inProgress={updateInProgress} onClick={handleSubmit}>
          {submitButtonText}
        </Button>
      </div>
    </div>
  );
};

export default EditListingPublish;
