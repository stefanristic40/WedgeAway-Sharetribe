import React, { useEffect, useState } from 'react';
import { bool, func, number, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';

//Import configs and util modules
import appSettings from '../../../../config/settings';
import { intlShape, injectIntl, FormattedMessage } from '../../../../util/reactIntl';
import * as validators from '../../../../util/validators';
import { types as sdkTypes } from '../../../../util/sdkLoader';
import { propTypes } from '../../../../util/types';

// Import shared components
import {
  Button,
  Form,
  FieldCurrencyInput,
  FieldTextInput,
  FieldSelect,
} from '../../../../components';

// Import modules from this directory
import css from './EditListingAddOnForm.module.css';
import EditListingAddOnItem from './EditListingAddOnItem';

export const EditListingAddOnFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        numberOfAddOn,
        formId,
        className,
        disabled,
        ready,
        onPreviousTab,
        handleSubmit,
        unitType,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = formRenderProps;
      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const { updateListingError, showListingsError } = fetchErrors || {};

      const [number, setNumber] = useState(numberOfAddOn);
      const handleWeekClick = () => {
        setNumber(number + 1);
      };

      // const addOnItemsMaybe = [<EditListingAddOnItem key={1} id={1} />];
      // for (let i = 2; i <= number; i++) {
      //   addOnItemsMaybe.push(<EditListingAddOnItem key={i} id={i} />);
      // }

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingAddOnForm.updateFailed" />
            </p>
          ) : null}
          {showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingAddOnForm.showListingFailed" />
            </p>
          ) : null}
          {/* <EditListingAddOnItem id={number} /> */}
          {/* {number === 0 && <EditListingAddOnItem key={1} id={1} />} */}
          {/* {addOnItemsMaybe} */}

          {[...Array(Number.parseInt(number))].map((_, index) => (
            <EditListingAddOnItem key={index + 1} id={index + 1} />
          ))}

          <button type="button" className={css.addButton} onClick={handleWeekClick}>
            <p style={{ padding: 0, margin: 0, fontSize: '20px' }}>+</p>
          </button>
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

EditListingAddOnFormComponent.defaultProps = {};

EditListingAddOnFormComponent.propTypes = {};

export default compose(injectIntl)(EditListingAddOnFormComponent);
