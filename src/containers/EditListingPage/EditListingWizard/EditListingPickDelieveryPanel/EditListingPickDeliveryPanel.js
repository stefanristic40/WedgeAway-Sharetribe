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
import EditListingPickDeliveryForm from './EditListingPickDeliveryForm';
import css from './EditListingPickDeliveryPanel.module.css';

const getInitialValues = params => {
  const { listing } = params;
  const { pickupDeliver } = listing?.attributes?.publicData || {};

  const {
    isApprove,
    isDelivery,
    minDist,
    maxDist,
    is_mon,
    is_tue,
    is_wed,
    is_thu,
    is_fri,
    is_sat,
    is_sun,
    monStartT,
    monEndT,
    monStartD,
    monEndD,
    tueStartT,
    tueEndT,
    tueStartD,
    tueEndD,
    wedStartT,
    wedEndT,
    wedStartD,
    wedEndD,
    thuStartT,
    thuEndT,
    thuStartD,
    thuEndD,
    friStartT,
    friEndT,
    friStartD,
    friEndD,
    satStartT,
    satEndT,
    satStartD,
    satEndD,
    sunStartT,
    sunEndT,
    sunStartD,
    sunEndD,
    price,
  } = pickupDeliver || {};

  return {
    isApprove: isApprove ? isApprove : null,
    isDelivery: isDelivery ? isDelivery : null,
    minDist: minDist ? minDist : null,
    maxDist: maxDist ? maxDist : null,
    is_mon: is_mon ? is_mon : null,
    is_tue: is_tue ? is_tue : null,
    is_wed: is_wed ? is_wed : null,
    is_thu: is_thu ? is_thu : null,
    is_fri: is_fri ? is_fri : null,
    is_sat: is_sat ? is_sat : null,
    is_sun: is_sun ? is_sun : null,
    monStartT: monStartT ? monStartT : null,
    monEndT: monEndT ? monEndT : null,
    monStartD: monStartD ? monStartD : null,
    monEndD: monEndD ? monEndD : null,
    tueStartT: tueStartT ? tueStartT : null,
    tueEndT: tueEndT ? tueEndT : null,
    tueStartD: tueStartD ? tueStartD : null,
    tueEndD: tueEndD ? tueEndD : null,
    wedStartT: wedStartT ? wedStartT : null,
    wedEndT: wedEndT ? wedEndT : null,
    wedStartD: wedStartD ? wedStartD : null,
    wedEndD: wedEndD ? wedEndD : null,
    thuStartT: thuStartT ? thuStartT : null,
    thuEndT: thuEndT ? thuEndT : null,
    thuStartD: thuStartD ? thuStartD : null,
    thuEndD: thuEndD ? thuEndD : null,
    friStartT: friStartT ? friStartT : null,
    friEndT: friEndT ? friEndT : null,
    friStartD: friStartD ? friStartD : null,
    friEndD: friEndD ? friEndD : null,
    satStartT: satStartT ? satStartT : null,
    satEndT: satEndT ? satEndT : null,
    satStartD: satStartD ? satStartD : null,
    satEndD: satEndD ? satEndD : null,
    sunStartT: sunStartT ? sunStartT : null,
    sunEndT: sunEndT ? sunEndT : null,
    sunStartD: sunStartD ? sunStartD : null,
    sunEndD: sunEndD ? sunEndD : null,
    price: price ? price : null,
  };
};

const EditListingPickDeliveryPanel = props => {
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
  const initialValues = getInitialValues(props);
  const isPublished = listing?.id && listing?.attributes?.state !== LISTING_STATE_DRAFT;
  const unitType = listing?.attributes?.publicData?.unitType;

  return (
    <div className={classes}>
      <ProgressBar currentStep={5} />
      <H3 as="h1">
        {isPublished ? (
          <FormattedMessage
            id="EditListingPickDeliveryPanel.title"
            values={{ listingTitle: <ListingLink listing={listing} />, lineBreak: <br /> }}
          />
        ) : (
          <FormattedMessage
            id="EditListingPickDeliveryPanel.createListingTitle"
            values={{ lineBreak: <br /> }}
          />
        )}
      </H3>
      <div className={css.subtitlePick}>
        Set available pickup & delivery times, and other instructions for your renter
      </div>
      <EditListingPickDeliveryForm
        className={css.form}
        initialValues={initialValues}
        onPreviousTab={onPreviousTab}
        onSubmit={values => {
          const {
            isApprove = null,
            isDelivery = null,
            minDist = null,
            maxDist = null,
            is_mon = null,
            is_tue = null,
            is_wed = null,
            is_thu = null,
            is_fri = null,
            is_sat = null,
            is_sun = null,
            monStartT = null,
            monEndT = null,
            monStartD = null,
            monEndD = null,
            tueStartT = null,
            tueEndT = null,
            tueStartD = null,
            tueEndD = null,
            wedStartT = null,
            wedEndT = null,
            wedStartD = null,
            wedEndD = null,
            thuStartT = null,
            thuEndT = null,
            thuStartD = null,
            thuEndD = null,
            friStartT = null,
            friEndT = null,
            friStartD = null,
            friEndD = null,
            satStartT = null,
            satEndT = null,
            satStartD = null,
            satEndD = null,
            sunStartT = null,
            sunEndT = null,
            sunStartD = null,
            sunEndD = null,
            price = null,
          } = values;

          const updateValues = {
            publicData: {
              pickupDeliver: {
                isApprove: isApprove,
                isDelivery: isDelivery,
                minDist: minDist,
                maxDist: maxDist,
                is_mon: is_mon,
                is_tue: is_tue,
                is_wed: is_wed,
                is_thu: is_thu,
                is_fri: is_fri,
                is_sat: is_sat,
                is_sun: is_sun,
                monStartT: monStartT,
                monEndT: monEndT,
                monStartD: monStartD,
                monEndD: monEndD,
                tueStartT: tueStartT,
                tueEndT: tueEndT,
                tueStartD: tueStartD,
                tueEndD: tueEndD,
                wedStartT: wedStartT,
                wedEndT: wedEndT,
                wedStartD: wedStartD,
                wedEndD: wedEndD,
                thuStartT: thuStartT,
                thuEndT: thuEndT,
                thuStartD: thuStartD,
                thuEndD: thuEndD,
                friStartT: friStartT,
                friEndT: friEndT,
                friStartD: friStartD,
                friEndD: friEndD,
                satStartT: satStartT,
                satEndT: satEndT,
                satStartD: satStartD,
                satEndD: satEndD,
                sunStartT: sunStartT,
                sunEndT: sunEndT,
                sunStartD: sunStartD,
                sunEndD: sunEndD,
                price: price,
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

EditListingPickDeliveryPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingPickDeliveryPanel.propTypes = {
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

export default EditListingPickDeliveryPanel;
