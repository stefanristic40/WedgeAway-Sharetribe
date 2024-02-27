import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Import configs and util modules
import { FormattedMessage } from '../../../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../../../util/types';
import { types as sdkTypes } from '../../../../util/sdkLoader';

// Import shared components
import { H3, H4, ListingLink } from '../../../../components';
import ProgressBar from '../../../../components/ProgressBar/ProgressBar';

// Import modules from this directory
import EditListingPolicyForm from './EditListingPolicyForm';
import css from './EditListingPolicyPanel.module.css';

const getInitialValues = params => {
  const { listing } = params;
  const { policy } = listing?.attributes?.publicData || {};

  const { rule1, rule2, rule3, rule4, customRule } = policy || {};

  return {
    rule1: rule1 ? rule1 : null,
    rule2: rule2 ? rule2 : null,
    rule3: rule3 ? rule3 : null,
    rule4: rule4 ? rule4 : null,
    customRule: customRule ? customRule : null,
  };
};

const EditListingPolicyPanel = props => {
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
  console.log('disabled', disabled);

  const classes = classNames(rootClassName || css.root, className);
  const initialValues = getInitialValues(props);
  const isPublished = listing?.id && listing?.attributes?.state !== LISTING_STATE_DRAFT;
  const unitType = listing?.attributes?.publicData?.unitType;

  return (
    <div className={classes}>
      <ProgressBar currentStep={6} />
      <H3 as="h1">
        {isPublished ? (
          <FormattedMessage
            id="EditListingPolicyPanel.title"
            values={{ listingTitle: <ListingLink listing={listing} />, lineBreak: <br /> }}
          />
        ) : (
          <FormattedMessage
            id="EditListingPolicyPanel.createListingTitle"
            values={{ lineBreak: <br /> }}
          />
        )}
      </H3>
      <div className={css.subtitlePolicy}>Set rules and a cancelation policy as a club owner.</div>
      <EditListingPolicyForm
        className={css.form}
        initialValues={initialValues}
        onPreviousTab={onPreviousTab}
        onSubmit={values => {
          const {
            rule1 = null,
            rule2 = null,
            rule3 = null,
            rule4 = null,
            customRule = null,
          } = values;

          const updateValues = {
            publicData: {
              policy: {
                rule1: rule1,
                rule2: rule2,
                rule3: rule3,
                rule4: rule4,
                customRule: customRule,
              },
            },
          };

          onSubmit(updateValues);
        }}
        unitType={unitType}
        saveActionMsg={submitButtonText}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
      />
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingPolicyPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingPolicyPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingPolicyPanel;
