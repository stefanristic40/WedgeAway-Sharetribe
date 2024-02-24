import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Field, Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import classNames from 'classnames';

// Import util modules
import { intlShape, injectIntl, FormattedMessage } from '../../../../util/reactIntl';
import { EXTENDED_DATA_SCHEMA_TYPES, propTypes } from '../../../../util/types';
import { maxLength, required, composeValidators } from '../../../../util/validators';

// Import shared components
import { Form, Button, FieldSelect, FieldTextInput, Heading } from '../../../../components';
// Import modules from this directory
import CustomExtendedDataField from '../CustomExtendedDataField';
import css from './EditListingDetailsForm.module.css';
import { EachClubDetail } from './EachClubDetail/EachClubDetail';
import { EachBagDetail } from './EachClubDetail/EachBagDetail';

const TITLE_MAX_LENGTH = 60;

// Show various error messages
const ErrorMessage = props => {
  const { fetchErrors } = props;
  const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
  const errorMessage = updateListingError ? (
    <FormattedMessage id="EditListingDetailsForm.updateFailed" />
  ) : createListingDraftError ? (
    <FormattedMessage id="EditListingDetailsForm.createListingDraftError" />
  ) : showListingsError ? (
    <FormattedMessage id="EditListingDetailsForm.showListingFailed" />
  ) : null;

  if (errorMessage) {
    return <p className={css.error}>{errorMessage}</p>;
  }
  return null;
};

// Hidden input field
const FieldHidden = props => {
  const { name } = props;
  return (
    <Field id={name} name={name} type="hidden" className={css.unitTypeHidden}>
      {fieldRenderProps => <input {...fieldRenderProps?.input} />}
    </Field>
  );
};

// Field component that either allows selecting listing type (if multiple types are available)
// or just renders hidden fields:
// - listingType              Set of predefined configurations for each listing type
// - transactionProcessAlias  Initiate correct transaction against Marketplace API
// - unitType                 Main use case: pricing unit
const FieldSelectListingType = props => {
  const { name, listingTypes, hasExistingListingType, onListingTypeChange, formApi, intl } = props;
  const hasMultipleListingTypes = listingTypes?.length > 1;

  const handleOnChange = value => {
    const selectedListingType = listingTypes.find(config => config.listingType === value);
    formApi.change('transactionProcessAlias', selectedListingType.transactionProcessAlias);
    formApi.change('unitType', selectedListingType.unitType);

    if (onListingTypeChange) {
      onListingTypeChange(selectedListingType);
    }
  };
  const getListingTypeLabel = listingType => {
    const listingTypeConfig = listingTypes.find(config => config.listingType === listingType);
    return listingTypeConfig ? listingTypeConfig.label : listingType;
  };

  return hasMultipleListingTypes && !hasExistingListingType ? (
    <>
      <FieldSelect
        id={name}
        name={name}
        className={css.listingTypeSelect}
        label={intl.formatMessage({ id: 'EditListingDetailsForm.listingTypeLabel' })}
        validate={required(
          intl.formatMessage({ id: 'EditListingDetailsForm.listingTypeRequired' })
        )}
        onChange={handleOnChange}
      >
        <option disabled value="">
          {intl.formatMessage({ id: 'EditListingDetailsForm.listingTypePlaceholder' })}
        </option>
        {listingTypes.map(config => {
          const type = config.listingType;
          return (
            <option key={type} value={type}>
              {config.label}
            </option>
          );
        })}
      </FieldSelect>
      <FieldHidden name="transactionProcessAlias" />
      <FieldHidden name="unitType" />
    </>
  ) : hasMultipleListingTypes && hasExistingListingType ? (
    <div className={css.listingTypeSelect}>
      <Heading as="h5" rootClassName={css.selectedLabel}>
        {intl.formatMessage({ id: 'EditListingDetailsForm.listingTypeLabel' })}
      </Heading>
      <p className={css.selectedValue}>{getListingTypeLabel(formApi.getFieldState(name)?.value)}</p>
      <FieldHidden name={name} />
      <FieldHidden name="transactionProcessAlias" />
      <FieldHidden name="unitType" />
    </div>
  ) : (
    <>
      <FieldHidden name={name} />
      <FieldHidden name="transactionProcessAlias" />
      <FieldHidden name="unitType" />
    </>
  );
};

// Add collect data for listing fields (both publicData and privateData) based on configuration
const AddListingFields = props => {
  const { listingType, listingFieldsConfig, intl } = props;
  console.log('listingFieldsConfig', listingFieldsConfig);
  const fields = listingFieldsConfig.reduce((pickedFields, fieldConfig) => {
    const { key, includeForListingTypes, schemaType, scope } = fieldConfig || {};
    const namespacedKey = scope === 'public' ? `pub_${key}` : `priv_${key}`;

    const isKnownSchemaType = EXTENDED_DATA_SCHEMA_TYPES.includes(schemaType);
    const isTargetListingType =
      includeForListingTypes == null || includeForListingTypes.includes(listingType);
    const isProviderScope = ['public', 'private'].includes(scope);

    return isKnownSchemaType && isTargetListingType && isProviderScope
      ? [
          ...pickedFields,
          <CustomExtendedDataField
            key={namespacedKey}
            name={namespacedKey}
            fieldConfig={fieldConfig}
            defaultRequiredMessage={intl.formatMessage({
              id: 'EditListingDetailsForm.defaultRequiredMessage',
            })}
          />,
        ]
      : pickedFields;
  }, []);

  return <>{fields}</>;
};

// Form that asks title, description, transaction process and unit type for pricing
// In addition, it asks about custom fields according to marketplace-custom-config.js
const EditListingDetailsFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={formRenderProps => {
      const {
        autoFocus,
        className,
        disabled,
        ready,
        formId,
        form: formApi,
        handleSubmit,
        onPreviousTab,
        onListingTypeChange,
        intl,
        invalid,
        pristine,
        selectableListingTypes,
        hasExistingListingType,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        listingFieldsConfig,
        values,
      } = formRenderProps;

      const { listingType } = values;

      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingDetailsForm.titleRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingDetailsForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);

      // Show title and description only after listing type is selected
      const showTitle = listingType;
      const showDescription = listingType;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <ErrorMessage fetchErrors={fetchErrors} />

          <FieldSelectListingType
            name="listingType"
            listingTypes={selectableListingTypes}
            hasExistingListingType={hasExistingListingType}
            onListingTypeChange={onListingTypeChange}
            formApi={formApi}
            intl={intl}
          />

          {0 && showTitle ? (
            <FieldTextInput
              id={`${formId}title`}
              name="title"
              className={css.title}
              type="text"
              label={intl.formatMessage({ id: 'EditListingDetailsForm.title' })}
              placeholder={intl.formatMessage({ id: 'EditListingDetailsForm.titlePlaceholder' })}
              maxLength={TITLE_MAX_LENGTH}
              validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
              autoFocus={autoFocus}
            />
          ) : null}

          {0 && showDescription ? (
            <FieldTextInput
              id={`${formId}description`}
              name="description"
              className={css.description}
              type="textarea"
              label={intl.formatMessage({ id: 'EditListingDetailsForm.description' })}
              placeholder={intl.formatMessage({
                id: 'EditListingDetailsForm.descriptionPlaceholder',
              })}
              validate={required(
                intl.formatMessage({
                  id: 'EditListingDetailsForm.descriptionRequired',
                })
              )}
            />
          ) : null}
          {/* Putter */}
          <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={0}
            type={0}
          />
          {/* Sand Wedge */}
          <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={14}
            type={0}
          />
          {/* Gap/Approach Wedge */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={28}
            type={0}
          /> */}
          {/* Lob Wedge */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={42}
            type={0}
          /> */}
          {/* Pitching Wedge */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={56}
            type={0}
          /> */}
          {/* 1 Iron */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={70}
            type={1}
          /> */}
          {/* 2 Iron */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={82}
            type={1}
          /> */}
          {/* 3 Iron */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={94}
            type={1}
          /> */}
          {/* 4 Iron */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={106}
            type={1}
          /> */}
          {/* 5 Iron */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={118}
            type={1}
          /> */}
          {/* 6 Iron */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={130}
            type={1}
          /> */}
          {/* 7 Iron */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={142}
            type={1}
          /> */}
          {/* 8 Iron */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={154}
            type={1}
          /> */}
          {/* 9 Iron */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={166}
            type={1}
          /> */}
          {/* 3 Hybrid */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={178}
            type={2}
          /> */}
          {/* 4 Hybrid */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={189}
            type={2}
          /> */}
          {/* 5 Hybrid */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={200}
            type={2}
          /> */}
          {/* 6 Hybrid */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={211}
            type={2}
          /> */}
          {/* 7 Hybrid */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={222}
            type={2}
          /> */}
          {/* 3 Wood */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={233}
            type={1}
          /> */}
          {/* 3HL Wood */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={245}
            type={1}
          /> */}
          {/* 5 Wood */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={257}
            type={1}
          /> */}
          {/* 7 Wood */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={269}
            type={1}
          /> */}
          {/* Heaven Wood */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={281}
            type={1}
          /> */}
          {/* 9 Wood */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={293}
            type={1}
          /> */}
          {/* 11 Wood */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={305}
            type={1}
          /> */}
          {/* Driver */}
          {/* <EachClubDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={317}
            type={1}
          /> */}
          {/* Bag */}
          {/* <EachBagDetail
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
            id={329}
          /> */}
          {/* <AddListingFields
            listingType={listingType}
            listingFieldsConfig={listingFieldsConfig}
            intl={intl}
          /> */}
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

EditListingDetailsFormComponent.defaultProps = {
  className: null,
  formId: 'EditListingDetailsForm',
  fetchErrors: null,
  hasExistingListingType: false,
  listingFieldsConfig: [],
};

EditListingDetailsFormComponent.propTypes = {
  className: string,
  formId: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  onListingTypeChange: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  selectableListingTypes: arrayOf(
    shape({
      listingType: string.isRequired,
      transactionProcessAlias: string.isRequired,
      unitType: string.isRequired,
    })
  ).isRequired,
  hasExistingListingType: bool,
  listingFieldsConfig: propTypes.listingFieldsConfig,
};

export default compose(injectIntl)(EditListingDetailsFormComponent);
