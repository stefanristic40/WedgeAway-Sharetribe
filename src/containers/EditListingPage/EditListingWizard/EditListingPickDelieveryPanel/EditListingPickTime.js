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

export const EditListingPickTime = props => {
  const { day, fDay } = props;
  const filterOptions = ['AM', 'PM'];
  const filterOptions1 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  return (
    <div className={css.pickupTime}>
      <div className={css.pickDay}>
        <Field name={`is_${day}`} component="input" type="checkbox" className={css.checkPick} />
        <div className={css.pickMedium}>{fDay}</div>
      </div>
      <div className={css.pickHours}>
        <div className={css.pickSmall}>Between</div>

        <FieldSelect className={classNames(css.item1)} name={`${day}StartT`} id={`${day}StartT`}>
          <option disabled value=""></option>
          {filterOptions1.map(optionConfig => {
            return (
              <option key={optionConfig} value={optionConfig}>
                {optionConfig}
              </option>
            );
          })}
        </FieldSelect>
        <FieldSelect className={classNames(css.item1)} name={`${day}StartD`} id={`${day}StartD`}>
          {filterOptions.map(optionConfig => {
            return (
              <option key={optionConfig} value={optionConfig}>
                {optionConfig}
              </option>
            );
          })}
        </FieldSelect>
        <div className={css.pickSmall}>and</div>

        <FieldSelect className={classNames(css.item1)} name={`${day}EndT`} id={`${day}EndT`}>
          <option disabled value=""></option>
          {filterOptions1.map(optionConfig => {
            return (
              <option key={optionConfig} value={optionConfig}>
                {optionConfig}
              </option>
            );
          })}
        </FieldSelect>
        <FieldSelect className={classNames(css.item1)} name={`${day}EndD`} id={`${day}EndD`}>
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
