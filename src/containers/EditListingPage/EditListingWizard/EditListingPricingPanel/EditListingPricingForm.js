import React from 'react';
import { bool, func, number, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';

// Import configs and util modules
import appSettings from '../../../../config/settings';
import { intlShape, injectIntl, FormattedMessage } from '../../../../util/reactIntl';
import { propTypes } from '../../../../util/types';
import * as validators from '../../../../util/validators';
import { formatMoney } from '../../../../util/currency';
import { types as sdkTypes } from '../../../../util/sdkLoader';

// Import shared components
import { Button, Form, FieldCurrencyInput, FieldTextInput } from '../../../../components';

// Import modules from this directory
import css from './EditListingPricingForm.module.css';

const { Money } = sdkTypes;

const getPriceValidators = (listingMinimumPriceSubUnits, marketplaceCurrency, intl) => {
  const priceRequiredMsgId = { id: 'EditListingPricingForm.priceRequired' };
  const priceRequiredMsg = intl.formatMessage(priceRequiredMsgId);
  const priceRequired = validators.required(priceRequiredMsg);

  const minPriceRaw = new Money(listingMinimumPriceSubUnits, marketplaceCurrency);
  const minPrice = formatMoney(intl, minPriceRaw);
  const priceTooLowMsgId = { id: 'EditListingPricingForm.priceTooLow' };
  const priceTooLowMsg = intl.formatMessage(priceTooLowMsgId, { minPrice });
  const minPriceRequired = validators.moneySubUnitAmountAtLeast(
    priceTooLowMsg,
    listingMinimumPriceSubUnits
  );

  return listingMinimumPriceSubUnits
    ? validators.composeValidators(priceRequired, minPriceRequired)
    : priceRequired;
};

export const EditListingPricingFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        formId,
        autoFocus,
        className,
        disabled,
        ready,
        onPreviousTab,
        handleSubmit,
        marketplaceCurrency,
        unitType,
        listingMinimumPriceSubUnits,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = formRenderProps;

      const priceValidators = getPriceValidators(
        listingMinimumPriceSubUnits,
        marketplaceCurrency,
        intl
      );

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const { updateListingError, showListingsError } = fetchErrors || {};

      return (
        <Form onSubmit={handleSubmit} className={classes}>
          {updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.updateFailed" />
            </p>
          ) : null}
          {showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.showListingFailed" />
            </p>
          ) : null}
          <div className={css.priceMainItems}>
            <div className={css.mainPrice}>
              <FieldCurrencyInput
                id={`${formId}price`}
                name="price"
                className={css.input}
                autoFocus={autoFocus}
                placeholder={intl.formatMessage({
                  id: 'EditListingPricingForm.priceInputPlaceholder1',
                })}
                currencyConfig={appSettings.getCurrencyFormatting(marketplaceCurrency)}
                validate={priceValidators}
              />
            </div>
            <div className={css.perDay}>Per Day</div>
          </div>

          <div className={css.discounts}>Discounts</div>

          <div className={css.discountsItems}>
            <FieldTextInput
              className={classNames(css.dayDiscount)}
              id={`${formId}days`}
              name="discoutsDay"
              type="number"
              placeholder="Days"
              parse={value => {
                const parsed = Number.parseInt(value, 10);
                return Number.isNaN(parsed) ? null : parsed;
              }}
              label="Days"
            />
            <FieldTextInput
              className={classNames(css.dayDiscount)}
              id={`${formId}percentage`}
              name="discoutsPercentage"
              type="number"
              placeholder="% Off"
              parse={value => {
                const parsed = Number.parseInt(value, 10);
                return Number.isNaN(parsed) ? null : parsed;
              }}
              label="% Off"
            />
          </div>

          <div className={css.buttonItems}>
            <Button className={css.submitButton} onClick={onPreviousTab}>
              Back
            </Button>
            <Button
              className={css.submitButton}
              type="submit"
              inProgress={submitInProgress}
              disabled={submitDisabled}
              ready={submitReady}
            >
              {saveActionMsg}
            </Button>
          </div>
        </Form>
      );
    }}
  />
);

EditListingPricingFormComponent.defaultProps = {
  fetchErrors: null,
  listingMinimumPriceSubUnits: 0,
  formId: 'EditListingPricingForm',
};

EditListingPricingFormComponent.propTypes = {
  formId: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  marketplaceCurrency: string.isRequired,
  unitType: string.isRequired,
  listingMinimumPriceSubUnits: number,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingPricingFormComponent);
