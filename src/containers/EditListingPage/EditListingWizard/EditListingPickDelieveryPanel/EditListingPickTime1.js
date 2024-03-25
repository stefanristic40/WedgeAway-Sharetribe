import React from 'react';
import classNames from 'classnames';
import css from './EditListingPickDeliveryForm.module.css';
import { Form as FinalForm, Field } from 'react-final-form';
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

export const EditListingPickTime1 = props => {
  const { day, fDay } = props;
  const filterOptions = ['AM', 'PM'];
  const filterOptions1 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  return (
    <div className={css.pickupTime}>
      {/* <FieldCheckbox name={`is_${day}`} id={`is_${day}`} /> */}
      <div className={css.pickDay}>
        <Field name={`is_${day}1`} component="input" type="checkbox" className={css.checkPick} />
        <div className={css.pickMedium}>{fDay}</div>
      </div>
      <div className={css.pickHours}>
        <div className={css.pickSmall}>Between</div>
        <FieldSelect className={classNames(css.item1)} name={`${day}StartT1`} id={`${day}StartT1`}>
          <option disabled value=""></option>
          {filterOptions1.map(optionConfig => {
            return (
              <option key={optionConfig} value={optionConfig}>
                {optionConfig}
              </option>
            );
          })}
        </FieldSelect>
        <FieldSelect className={classNames(css.item1)} name={`${day}StartD1`} id={`${day}StartD1`}>
          <option disabled value=""></option>
          {filterOptions.map(optionConfig => {
            return (
              <option key={optionConfig} value={optionConfig}>
                {optionConfig}
              </option>
            );
          })}
        </FieldSelect>
        <div className={css.pickSmall}>and</div>

        <FieldSelect className={classNames(css.item1)} name={`${day}EndT1`} id={`${day}EndT1`}>
          <option disabled value=""></option>
          {filterOptions1.map(optionConfig => {
            return (
              <option key={optionConfig} value={optionConfig}>
                {optionConfig}
              </option>
            );
          })}
        </FieldSelect>
        <FieldSelect className={classNames(css.item1)} name={`${day}EndD1`} id={`${day}EndD1`}>
          <option disabled value=""></option>
          {filterOptions.map(optionConfig => {
            return (
              <option key={optionConfig} value={optionConfig}>
                {optionConfig}
              </option>
            );
          })}
        </FieldSelect>
      </div>
    </div>
  );
};
