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
import EditListingAddOnForm from './EditListingAddOnForm';
import css from './EditListingAddOnPanel.module.css';

const getInitialValues = params => {
  const { listing } = params;
  const { addOns } = listing?.attributes?.publicData || {};
  let cnt = 0;

  let result = {};
  while (true) {
    if (addOns?.hasOwnProperty(`addOn${++cnt}`)) {
      result = {
        ...result,
        [`addOnTitle${cnt}`]: addOns[`addOn${cnt}`].addOnTitle,
        [`addOnBrand${cnt}`]: addOns[`addOn${cnt}`].addOnBrand,
        [`addOnManufact${cnt}`]: addOns[`addOn${cnt}`].addOnManufact,
        [`addOnLink${cnt}`]: addOns[`addOn${cnt}`].addOnLink,
        [`addOnPrice${cnt}`]: addOns[`addOn${cnt}`].addOnPrice,
      };
    } else {
      break;
    }
  }
  return { initialVal: result, number: --cnt };
};

const EditListingAddOnPanel = props => {
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
  const temp = getInitialValues(props);
  const initialValues = temp.initialVal;
  const numberOfAddOn = temp.number;
  const isPublished = listing?.id && listing?.attributes?.state !== LISTING_STATE_DRAFT;
  const unitType = listing?.attributes?.publicData?.unitType;

  return (
    <div className={classes}>
      <ProgressBar currentStep={5} />
      <H3 as="h1">
        {isPublished ? (
          <FormattedMessage
            id="EditListingAddOnPanel.title"
            values={{ listingTitle: <ListingLink listing={listing} />, lineBreak: <br /> }}
          />
        ) : (
          <FormattedMessage
            id="EditListingAddOnPanel.createListingTitle"
            values={{ lineBreak: <br /> }}
          />
        )}
      </H3>
      <H4 as="h2">
        You can sell renters add ons suc as gloves, tees, balls & clothing. Select your add ons, and
        the price you'd like to charge below. The customer purchases and keeps these itmes, and are
        not be be returned to the owner.
      </H4>
      <EditListingAddOnForm
        className={css.form}
        initialValues={initialValues}
        onPreviousTab={onPreviousTab}
        numberOfAddOn={numberOfAddOn}
        onSubmit={values => {
          // const updateValues = {};
          const updateValues = {
            publicData: {
              addOns: {},
            },
          };
          updateValues.publicData.addOns = updateValues?.publicData?.addOns || {};
          let cnt = 0;
          while (typeof values[`addOnTitle${++cnt}`] !== 'undefined') {
            updateValues.publicData.addOns[`addOn${cnt}`] = {
              addOnTitle: values[`addOnTitle${cnt}`] ? values[`addOnTitle${cnt}`] : null,
              addOnBrand: values[`addOnBrand${cnt}`] ? values[`addOnBrand${cnt}`] : null,
              addOnManufact: values[`addOnManufact${cnt}`] ? values[`addOnManufact${cnt}`] : null,
              addOnLink: values[`addOnLink${cnt}`] ? values[`addOnLink${cnt}`] : null,
              addOnPrice: values[`addOnPrice${cnt}`] ? values[`addOnPrice${cnt}`] : null,
            };
          }
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

EditListingAddOnPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingAddOnPanel.propTypes = {
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

export default EditListingAddOnPanel;
