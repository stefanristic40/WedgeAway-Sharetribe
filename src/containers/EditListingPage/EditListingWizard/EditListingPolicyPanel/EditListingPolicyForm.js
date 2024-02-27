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
import css from './EditListingPolicyForm.module.css';

export const EditListingPolicyFormComponent = props => (
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

          <H4>Club Owner Rules (Use Ours or Type Your Own)</H4>

          <FieldTextInput
            id="customeRule"
            name="customRule"
            className={css.input}
            autoFocus={autoFocus}
            type="textarea"
            label=""
            placeholder={intl.formatMessage({
              id: 'EditListingPolicyForm.customeRuleInputPlaceholder',
            })}
            {...validateMaybe}
          />
          {/* <FieldCheckbox
              id="checkbox-id1"
              name="rule1"
              label=""
              value="rule1"
              className={css.checkPolicy}
            /> */}

          <div className={css.policyTitle}>Cancelation Policy</div>
          <div className={css.policyDetail}>
            Select a pre-set cancelation policy for club renters. Having a flexible cancelation
            policy results in more bookings!
          </div>

          <div className={css.checkBox}>
            <div className={css.checkOne}>
              <Field name="rule1" component="input" type="checkbox" className={css.checkPolicy} />
            </div>
            <div className={css.policyTitle}>Flexible Cancellation Policy (Recommended)</div>
            <div className={css.policyDetail}>
              Renters can cancel until 24 hours before check-in for a full refund
            </div>
          </div>

          <div className={css.checkBox}>
            <div className={css.checkOne}>
              <Field name="rule2" component="input" type="checkbox" className={css.checkPolicy} />
            </div>
            <div className={css.policyTitle}>Moderate Cancellation Policy</div>
            <div className={css.policyDetail}>
              The moderate policy allows cancellation until 3 days before the first rental day for a
              full refund, and after that, a 50% refund
            </div>
          </div>

          <div className={css.checkBox}>
            <div className={css.checkOne}>
              <Field name="rule3" component="input" type="checkbox" className={css.checkPolicy} />
            </div>
            <div className={css.policyTitle}>Firm Cancellation Policy</div>
            <div className={css.policyDetail}>
              Renters can cancel at least 14 days before check-in for a full refund and between and
              up to 13 days before for a 50% refund. For cancellations less than seven days before
              check-in, the renter pays 100% for all days. If the cancellation occurs at least 14
              days before check-in, the renter also has the option of canceling within 48 hours of
              booking for a full refund.
            </div>
          </div>

          <div className={css.checkBox}>
            <div className={css.checkOne}>
              <Field name="rule4" component="input" type="checkbox" className={css.checkPolicy} />
            </div>
            <div className={css.policyTitle}>Strict Cancellation Policy </div>
            <div className={css.policyDetail}>
              Renters must cancel within 48 hours of booking and at least 7 days before check-in to
              receive a full refund. If guests cancel between 2 and 6 days before check-in, they
              must pay 50% for all days, and if they cancel day of or within 24 hours of booking,
              they must pay 100% for all days.
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

EditListingPolicyFormComponent.defaultProps = {
  fetchErrors: null,
  formId: 'EditListingPolicy',
};

EditListingPolicyFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingPolicyFormComponent);
