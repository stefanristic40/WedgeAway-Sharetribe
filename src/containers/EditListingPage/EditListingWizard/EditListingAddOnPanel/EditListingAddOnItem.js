import React from 'react';

import classNames from 'classnames';

// Import shared components
import {
  Button,
  Form,
  FieldCurrencyInput,
  FieldTextInput,
  FieldSelect,
} from '../../../../components';

import css from './EditListingAddOnForm.module.css';

export default function EditListingAddOnItem(props) {
  const id = props.id ? props.id : 0;
  const filterOptions = ['Balls', 'Tees', 'Gloves', 'Clothing'];

  return (
    <div>
      <div className={css.itemsAddOn}>
        <FieldSelect
          className={classNames(css.item1)}
          name={`addOnTitle${id}`}
          id={`addOnTitle${id}`}
          // {...validateMaybe}
        >
          <option disabled value="">
            Items
          </option>
          {filterOptions.map(optionConfig => {
            return (
              <option key={optionConfig} value={optionConfig}>
                {optionConfig}
              </option>
            );
          })}
        </FieldSelect>

        <FieldTextInput
          className={classNames(css.item2)}
          id={`addOnBrand${id}`}
          name={`addOnBrand${id}`}
          type="input"
          placeholder="Brand"
          label=""
        />

        <FieldTextInput
          className={classNames(css.item3)}
          id={`addOnManufact${id}`}
          name={`addOnManufact${id}`}
          type="input"
          placeholder="Manufacturer Title"
          label=""
        />

        <FieldTextInput
          className={classNames(css.item4)}
          id={`addOnLink${id}`}
          name={`addOnLink${id}`}
          type="input"
          placeholder="Link to Product Online"
          label=""
        />

        <FieldTextInput
          className={classNames(css.item5)}
          id={`addOnPrice${id}`}
          name={`addOnPrice${id}`}
          type="number"
          placeholder="Your Price($)"
          parse={value => {
            const parsed = Number.parseFloat(value);
            return Number.isNaN(parsed) ? null : parsed;
          }}
          label=""
        />
      </div>
      <div className={css.line} />
    </div>
  );
}
