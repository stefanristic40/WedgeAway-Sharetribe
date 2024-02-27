import React from 'react';
import { bool, func, number, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import classNames from 'classnames';

// Import configs and util modules
import appSettings from '../../../../config/settings';
import { intlShape, injectIntl, FormattedMessage } from '../../../../util/reactIntl';
import { propTypes } from '../../../../util/types';
import * as validators from '../../../../util/validators';
import { formatMoney } from '../../../../util/currency';
import { types as sdkTypes } from '../../../../util/sdkLoader';
import { required } from '../../../../util/validators';

// Import shared components
import {
  Button,
  Form,
  FieldCurrencyInput,
  FieldTextInput,
  FieldSelect,
  FieldCheckbox,
  H4,
} from '../../../../components';
// import Field from '../../../PageBuilder/Field';

// Import modules from this directory
import css from './EditListingPickDeliveryForm.module.css';

export const EditListingPickDiliveryFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        autoFocus,
        onPreviousTab,
        handleSubmit,
        unitType,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        disabled,
        ready,
        updated,
        updateInProgress,
        fetchErrors,
      } = formRenderProps;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      //   const submitDisabled = invalid || pristine;

      //   const [-submitDisabled, setSubmitDisabled] = React.useState(false);

      const { updateListingError, showListingsError } = fetchErrors || {};

      const validateMaybe = { validate: required('Please Fill In...') };

      const filterOptions = ['AM', 'PM'];

      const filterOptions1 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

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

          <div className={css.pickTitle}>
            Do You Want to Approve a Customer’s Booking Before Accepting?
          </div>
          <div className={css.pickItems}>
            <div>
              <Field
                name="isApprove"
                component="input"
                type="radio"
                className={css.checkPick}
                value="true"
              />
            </div>
            <div className={css.pickMedium}>Yes</div>
            <div>
              <Field
                name="isApprove"
                component="input"
                type="radio"
                className={css.checkPick}
                value="false"
              />
            </div>
            <div className={css.pickMedium}>No</div>
          </div>

          <div className={css.pickTitle}>Do You Offer Delivery?</div>
          <div className={css.pickItems}>
            <div>
              <Field
                name="isDelivery"
                component="input"
                type="radio"
                className={css.checkPick}
                value="true"
              />
            </div>
            <div className={css.pickMedium}>Yes</div>
            <div>
              <Field
                name="isDelivery"
                component="input"
                type="radio"
                className={css.checkPick}
                value="false"
              />
            </div>
            <div className={css.pickMedium}>No</div>
          </div>

          <div className={css.pickTitle}>If yes, set your price for delivery and max mileage.</div>

          <div className={css.costPerMile}>
            <div className={css.pickMedium}>Between</div>
            <FieldTextInput
              className={classNames(css.dist)}
              id="minDist"
              name="minDist"
              type="number"
              placeholder="Miles"
              parse={value => {
                const parsed = Number.parseInt(value, 10);
                return Number.isNaN(parsed) ? null : parsed;
              }}
              label=""
            />
            <div className={css.pickMedium}>and</div>
            <FieldTextInput
              className={classNames(css.dist)}
              id="maxDist"
              name="maxDist"
              type="number"
              placeholder="Miles"
              parse={value => {
                const parsed = Number.parseInt(value, 10);
                return Number.isNaN(parsed) ? null : parsed;
              }}
              label=""
            />
            <FieldTextInput
              className={classNames(css.price)}
              id="price"
              name="price"
              type="number"
              placeholder="Price ($)"
              parse={value => {
                const parsed = Number.parseInt(value, 10);
                return Number.isNaN(parsed) ? null : parsed;
              }}
              label=""
            />
          </div>

          <div className={css.pickTitle}>Pickup Days & Times</div>
          <div className={css.pickupTime}>
            <div className={css.pickDay}>
              <Field
                name="is_mon"
                component="input"
                type="checkbox"
                className={css.checkPick}
                //   value="true"
              />
              <div className={css.pickMedium}>Monday</div>
            </div>
            <div className={css.pickHours}>
              <div className={css.pickMedium}>Between</div>

              <FieldSelect className={classNames(css.item1)} name="monStartD" id="monStartD">
                {filterOptions.map(optionConfig => {
                  return (
                    <option key={optionConfig} value={optionConfig}>
                      {optionConfig}
                    </option>
                  );
                })}
              </FieldSelect>
              <FieldSelect className={classNames(css.item1)} name="monStartT" id="monStartT">
                <option disabled value=""></option>
                {filterOptions1.map(optionConfig => {
                  return (
                    <option key={optionConfig} value={optionConfig}>
                      {optionConfig}
                    </option>
                  );
                })}
              </FieldSelect>
              <div className={css.pickMedium}>and</div>
              <FieldSelect className={classNames(css.item1)} name="monEndD" id="monEndD">
                {filterOptions.map(optionConfig => {
                  return (
                    <option key={optionConfig} value={optionConfig}>
                      {optionConfig}
                    </option>
                  );
                })}
              </FieldSelect>
              <FieldSelect className={classNames(css.item1)} name="monEndT" id="monEndT">
                <option disabled value=""></option>
                {filterOptions1.map(optionConfig => {
                  return (
                    <option key={optionConfig} value={optionConfig}>
                      {optionConfig}
                    </option>
                  );
                })}
              </FieldSelect>
            </div>
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

EditListingPickDiliveryFormComponent.defaultProps = {
  fetchErrors: null,
  formId: 'EditListingPickDelivery',
};

EditListingPickDiliveryFormComponent.propTypes = {
  formId: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  unitType: string.isRequired,
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

export default compose(injectIntl)(EditListingPickDiliveryFormComponent);
