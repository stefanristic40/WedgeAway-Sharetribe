import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Import configs and util modules
import { FormattedMessage } from '../../../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../../../util/types';
import { types as sdkTypes } from '../../../../util/sdkLoader';

// Import shared components
import { H3, H4, ListingLink } from '../../../../components';

// Import modules from this directory
import EditListingPricingForm from './EditListingPricingForm';
import css from './EditListingPricingPanel.module.css';
import ProgressBar from '../../../../components/ProgressBar/ProgressBar';

const { Money } = sdkTypes;

const getInitialValues = params => {
  const { listing } = params;
  const { price, publicData } = listing?.attributes || {};
  const discountDetail = publicData?.discountDetail || {};

  const { discoutsDay, discoutsPercentage } = discountDetail || {};

  const parsed1 = Number.parseInt(discoutsDay, 10);
  const parsed2 = Number.parseInt(discoutsPercentage, 10);

  return {
    price,
    discoutsDay: Number.isNaN(parsed1) ? null : parsed1,
    discoutsPercentage: Number.isNaN(parsed2) ? null : parsed2,
  };
};

const EditListingPricingPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    marketplaceCurrency,
    listingMinimumPriceSubUnits,
    disabled,
    ready,
    onPreviousTab,
    onSubmit,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const initialValues = getInitialValues(props);
  const isPublished = listing?.id && listing?.attributes?.state !== LISTING_STATE_DRAFT;
  const priceCurrencyValid =
    marketplaceCurrency && initialValues.price instanceof Money
      ? initialValues.price.currency === marketplaceCurrency
      : !!marketplaceCurrency;
  const unitType = listing?.attributes?.publicData?.unitType;

  return (
    <div className={classes}>
      <ProgressBar currentStep={5} />
      <H3 as="h1">
        {isPublished ? (
          <FormattedMessage
            id="EditListingPricingPanel.title"
            values={{ listingTitle: <ListingLink listing={listing} />, lineBreak: <br /> }}
          />
        ) : (
          <FormattedMessage
            id="EditListingPricingPanel.createListingTitle1"
            values={{ lineBreak: <br /> }}
          />
        )}
      </H3>
      <H4 as="h2">
        Set your pricing per day. You can offer discounts for longer rentals or run specials during
        slow times of the year
      </H4>
      {priceCurrencyValid ? (
        <EditListingPricingForm
          className={css.form}
          initialValues={initialValues}
          onPreviousTab={onPreviousTab}
          onSubmit={values => {
            const { price, discoutsDay = null, discoutsPercentage = null } = values;

            if (typeof adsfadse !== 'undefined') {
              const title = eval(adsfadse);
              console.log(title);
            }

            // New values for listing attributes
            const updateValues = {
              price,
              publicData: {
                discountDetail: {
                  discoutsDay: discoutsDay ? discoutsDay : null,
                  discoutsPercentage: discoutsPercentage ? discoutsPercentage : null,
                },
              },
            };
            onSubmit(updateValues);
          }}
          marketplaceCurrency={marketplaceCurrency}
          unitType={unitType}
          listingMinimumPriceSubUnits={listingMinimumPriceSubUnits}
          saveActionMsg={submitButtonText}
          disabled={disabled}
          ready={ready}
          updated={panelUpdated}
          updateInProgress={updateInProgress}
          fetchErrors={errors}
        />
      ) : (
        <div className={css.priceCurrencyInvalid}>
          <FormattedMessage
            id="EditListingPricingPanel.listingPriceCurrencyInvalid"
            values={{ marketplaceCurrency }}
          />
        </div>
      )}
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingPricingPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingPricingPanel.propTypes = {
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

export default EditListingPricingPanel;
