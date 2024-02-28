import React, { Component } from 'react';
import { func, object, shape, string } from 'prop-types';
import { Field } from 'react-final-form';
import loadable from '@loadable/component';
import { ValidationError } from '..';
import css from './LocationAutocompleteInput.module.css';

import classNames from 'classnames';
import IconHourGlass from './IconHourGlass';

// LocationAutocompleteInputImplOrigin is a big component that includes code for both Mapbox and Google Maps
// It is loaded dynamically - i.e. it is splitted to its own code chunk.
const LocationAutocompleteInputImplOrigin = loadable(() =>
  import(
    /* webpackChunkName: "LocationAutocompleteInputImplOrigin" */ './LocationAutocompleteInputImplOrigin'
  )
);

class LocationAutocompleteInputComponent extends Component {
  render() {
    /* eslint-disable no-unused-vars */
    const { rootClassName, labelClassName, hideErrorMessage, ...restProps } = this.props;
    const { input, label, meta, valueFromForm, ...otherProps } = restProps;
    /* eslint-enable no-unused-vars */

    const value = typeof valueFromForm !== 'undefined' ? valueFromForm : input.value;
    const locationAutocompleteProps = { label, meta, ...otherProps, input: { ...input, value } };
    const labelInfo = label ? (
      <label className={labelClassName} htmlFor={input.name}>
        {label}
      </label>
    ) : null;

    return (
      <div className={rootClassName}>
        {/* {labelInfo} */}
        <div className={css.searchLineWithIcon}>
          <div style={{ width: '100%' }}>
            <LocationAutocompleteInputImplOrigin {...locationAutocompleteProps} />
          </div>
          <div className={css.icon}>
            <IconHourGlass />
          </div>
        </div>

        <div className={css.hintLocation}>
          Your address will not be visible to renters and/or other club owners.
        </div>
        {hideErrorMessage ? null : <ValidationError fieldMeta={meta} />}
      </div>
    );
  }
}

LocationAutocompleteInputComponent.defaultProps = {
  rootClassName: null,
  labelClassName: null,
  type: null,
  label: null,
};

LocationAutocompleteInputComponent.propTypes = {
  rootClassName: string,
  labelClassName: string,
  input: shape({
    onChange: func.isRequired,
    name: string.isRequired,
  }).isRequired,
  label: string,
  meta: object.isRequired,
};

export default LocationAutocompleteInputImplOrigin;

export const FieldLocationAutocompleteInputOrigin = props => {
  return <Field component={LocationAutocompleteInputComponent} {...props} />;
};
