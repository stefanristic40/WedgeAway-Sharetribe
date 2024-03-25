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
    is_mon1,
    is_tue1,
    is_wed1,
    is_thu1,
    is_fri1,
    is_sat1,
    is_sun1,
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
    monStartT1,
    monEndT1,
    monStartD1,
    monEndD1,
    tueStartT1,
    tueEndT1,
    tueStartD1,
    tueEndD1,
    wedStartT1,
    wedEndT1,
    wedStartD1,
    wedEndD1,
    thuStartT1,
    thuEndT1,
    thuStartD1,
    thuEndD1,
    friStartT1,
    friEndT1,
    friStartD1,
    friEndD1,
    satStartT1,
    satEndT1,
    satStartD1,
    satEndD1,
    sunStartT1,
    sunEndT1,
    sunStartD1,
    sunEndD1,
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
    is_mon: is_mon1 ? is_mon1 : null,
    is_tue: is_tue1 ? is_tue1 : null,
    is_wed: is_wed1 ? is_wed1 : null,
    is_thu: is_thu1 ? is_thu1 : null,
    is_fri: is_fri1 ? is_fri1 : null,
    is_sat: is_sat1 ? is_sat1 : null,
    is_sun: is_sun1 ? is_sun1 : null,
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
    monStartT1: monStartT1 ? monStartT1 : null,
    monEndT1: monEndT1 ? monEndT1 : null,
    monStartD1: monStartD1 ? monStartD1 : null,
    monEndD1: monEndD1 ? monEndD1 : null,
    tueStartT1: tueStartT1 ? tueStartT1 : null,
    tueEndT1: tueEndT1 ? tueEndT1 : null,
    tueStartD1: tueStartD1 ? tueStartD1 : null,
    tueEndD1: tueEndD1 ? tueEndD1 : null,
    wedStartT1: wedStartT1 ? wedStartT1 : null,
    wedEndT1: wedEndT1 ? wedEndT1 : null,
    wedStartD1: wedStartD1 ? wedStartD1 : null,
    wedEndD1: wedEndD1 ? wedEndD1 : null,
    thuStartT1: thuStartT1 ? thuStartT1 : null,
    thuEndT1: thuEndT1 ? thuEndT1 : null,
    thuStartD1: thuStartD1 ? thuStartD1 : null,
    thuEndD1: thuEndD1 ? thuEndD1 : null,
    friStartT1: friStartT1 ? friStartT1 : null,
    friEndT1: friEndT1 ? friEndT1 : null,
    friStartD1: friStartD1 ? friStartD1 : null,
    friEndD1: friEndD1 ? friEndD1 : null,
    satStartT1: satStartT1 ? satStartT1 : null,
    satEndT1: satEndT1 ? satEndT1 : null,
    satStartD1: satStartD1 ? satStartD1 : null,
    satEndD1: satEndD1 ? satEndD1 : null,
    sunStartT1: sunStartT1 ? sunStartT1 : null,
    sunEndT1: sunEndT1 ? sunEndT1 : null,
    sunStartD1: sunStartD1 ? sunStartD1 : null,
    sunEndD1: sunEndD1 ? sunEndD1 : null,
    price: price ? price : null,
    isDelivery: 'true',
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
      <ProgressBar currentStep={7} />
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

            is_mon1 = null,
            is_tue1 = null,
            is_wed1 = null,
            is_thu1 = null,
            is_fri1 = null,
            is_sat1 = null,
            is_sun1 = null,
            monStartT1 = null,
            monEndT1 = null,
            monStartD1 = null,
            monEndD1 = null,
            tueStartT1 = null,
            tueEndT1 = null,
            tueStartD1 = null,
            tueEndD1 = null,
            wedStartT1 = null,
            wedEndT1 = null,
            wedStartD1 = null,
            wedEndD1 = null,
            thuStartT1 = null,
            thuEndT1 = null,
            thuStartD1 = null,
            thuEndD1 = null,
            friStartT1 = null,
            friEndT1 = null,
            friStartD1 = null,
            friEndD1 = null,
            satStartT1 = null,
            satEndT1 = null,
            satStartD1 = null,
            satEndD1 = null,
            sunStartT1 = null,
            sunEndT1 = null,
            sunStartD1 = null,
            sunEndD1 = null,

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

                is_mon1: is_mon1,
                is_tue1: is_tue1,
                is_wed1: is_wed1,
                is_thu1: is_thu1,
                is_fri1: is_fri1,
                is_sat1: is_sat1,
                is_sun1: is_sun1,
                monStartT1: monStartT1,
                monEndT1: monEndT1,
                monStartD1: monStartD1,
                monEndD1: monEndD1,
                tueStartT1: tueStartT1,
                tueEndT1: tueEndT1,
                tueStartD1: tueStartD1,
                tueEndD1: tueEndD1,
                wedStartT1: wedStartT1,
                wedEndT1: wedEndT1,
                wedStartD1: wedStartD1,
                wedEndD1: wedEndD1,
                thuStartT1: thuStartT1,
                thuEndT1: thuEndT1,
                thuStartD1: thuStartD1,
                thuEndD1: thuEndD1,
                friStartT1: friStartT1,
                friEndT1: friEndT1,
                friStartD1: friStartD1,
                friEndD1: friEndD1,
                satStartT1: satStartT1,
                satEndT1: satEndT1,
                satStartD1: satStartD1,
                satEndD1: satEndD1,
                sunStartT1: sunStartT1,
                sunEndT1: sunEndT1,
                sunStartD1: sunStartD1,
                sunEndD1: sunEndD1,

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
