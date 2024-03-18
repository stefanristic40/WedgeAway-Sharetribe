import React, { useEffect, useState } from 'react';
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

import { EditListingPickTime } from './EditListingPickTime';

// Import modules from this directory
import css from './EditListingPickDeliveryForm.module.css';

export const EditListingPickDiliveryFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{
      setSameStartT: (args, state, utils) => {
        utils.changeValue(state, 'tueStartT', () => args[0]);
        utils.changeValue(state, 'wedStartT', () => args[0]);
        utils.changeValue(state, 'thuStartT', () => args[0]);
        utils.changeValue(state, 'friStartT', () => args[0]);
        utils.changeValue(state, 'satStartT', () => args[0]);
        utils.changeValue(state, 'sunStartT', () => args[0]);
      },

      setSameEndT: (args, state, utils) => {
        utils.changeValue(state, 'tueEndT', () => args[0]);
        utils.changeValue(state, 'wedEndT', () => args[0]);
        utils.changeValue(state, 'thuEndT', () => args[0]);
        utils.changeValue(state, 'friEndT', () => args[0]);
        utils.changeValue(state, 'satEndT', () => args[0]);
        utils.changeValue(state, 'sunEndT', () => args[0]);
      },
      setSameStartD: (args, state, utils) => {
        utils.changeValue(state, 'tueStartD', () => args[0]);
        utils.changeValue(state, 'wedStartD', () => args[0]);
        utils.changeValue(state, 'thuStartD', () => args[0]);
        utils.changeValue(state, 'friStartD', () => args[0]);
        utils.changeValue(state, 'satStartD', () => args[0]);
        utils.changeValue(state, 'sunStartD', () => args[0]);
      },
      setSameEndD: (args, state, utils) => {
        utils.changeValue(state, 'tueEndD', () => args[0]);
        utils.changeValue(state, 'wedEndD', () => args[0]);
        utils.changeValue(state, 'thuEndD', () => args[0]);
        utils.changeValue(state, 'friEndD', () => args[0]);
        utils.changeValue(state, 'satEndD', () => args[0]);
        utils.changeValue(state, 'sunEndD', () => args[0]);
      },
      setSameCheck: (args, state, utils) => {
        console.log('args', args);
        utils.changeValue(state, 'is_tue', () => args[0]);
        utils.changeValue(state, 'is_wed', () => args[0]);
        utils.changeValue(state, 'is_thu', () => args[0]);
        utils.changeValue(state, 'is_fri', () => args[0]);
        utils.changeValue(state, 'is_sat', () => args[0]);
        utils.changeValue(state, 'is_sun', () => args[0]);
      },
    }}
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
        form,
        updateInProgress,
        fetchErrors,
        values,
      } = formRenderProps;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      const [flag, setFlag] = useState(false);
      const [inputVal, setInputVal] = useState('');
      const handleOnchange = e => {
        setInputVal(e.target.value);
      };

      //   const submitDisabled = invalid || pristine;

      //   const [-submitDisabled, setSubmitDisabled] = React.useState(false);

      const { updateListingError, showListingsError } = fetchErrors || {};

      const validateMaybe = { validate: required('Please Fill In...') };

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
                const parsed = Number.parseFloat(value);
                return Number.isNaN(parsed) ? null : parsed;
              }}
              label=""
            />
          </div>

          <div className={css.pickTitle}>Pickup Days & Times</div>
          {/* //Set Same Availability for All Day */}
          <div
            className={css.clickForSame}
            onClick={() => {
              form.mutators.setSameStartT(values['monStartT']);
              form.mutators.setSameEndT(values['monEndT']);
              form.mutators.setSameStartD(values['monStartD']);
              form.mutators.setSameEndD(values['monEndD']);
              form.mutators.setSameCheck(values['is_mon']);
              console.log('monStartT', values['tueEndT']);
              console.log('t', values['is_tue']);
            }}
          >
            Set Same Availability for All Day{' '}
          </div>

          <EditListingPickTime day="mon" fDay="Monday" />
          <EditListingPickTime day="tue" fDay="Tuesday" />
          <EditListingPickTime day="wed" fDay="Wednesday" />
          <EditListingPickTime day="thu" fDay="Thursday" />
          <EditListingPickTime day="fri" fDay="Friday" />
          <EditListingPickTime day="sat" fDay="Saturday" />
          <EditListingPickTime day="sun" fDay="Sunday" />

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
