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

const TITLE_MAX_LENGTH = 60;

const EditListingEachInfo = props => {
  //   const { listingType, listingFieldsConfig, intl, number } = props;
  const { listingType, fieldConfig, intl } = props;

  const { key, includeForListingTypes, schemaType, scope } = fieldConfig || {};
  const namespacedKey = scope === 'public' ? `pub_${key}` : `priv_${key}`;

  const isKnownSchemaType = EXTENDED_DATA_SCHEMA_TYPES.includes(schemaType);
  const isTargetListingType =
    includeForListingTypes == null || includeForListingTypes.includes(listingType);
  const isProviderScope = ['public', 'private'].includes(scope);
  return isKnownSchemaType && isTargetListingType && isProviderScope ? (
    <CustomExtendedDataField
      key={namespacedKey}
      name={namespacedKey}
      fieldConfig={fieldConfig}
      defaultRequiredMessage={intl.formatMessage({
        id: 'EditListingDetailsForm.defaultRequiredMessage',
      })}
    />
  ) : null;
};
export default EditListingEachInfo;

//   const fields = listingFieldsConfig.reduce((pickedFields, fieldConfig) => {
//     const { key, includeForListingTypes, schemaType, scope } = fieldConfig || {};
//     const namespacedKey = scope === 'public' ? `pub_${key}` : `priv_${key}`;

//     const isKnownSchemaType = EXTENDED_DATA_SCHEMA_TYPES.includes(schemaType);
//     const isTargetListingType =
//       includeForListingTypes == null || includeForListingTypes.includes(listingType);
//     const isProviderScope = ['public', 'private'].includes(scope);

//     return isKnownSchemaType && isTargetListingType && isProviderScope
//       ? [
//           ...pickedFields,
//           <CustomExtendedDataField
//             key={namespacedKey}
//             name={namespacedKey}
//             fieldConfig={fieldConfig}
//             defaultRequiredMessage={intl.formatMessage({
//               id: 'EditListingDetailsForm.defaultRequiredMessage',
//             })}
//           />,
//         ]
//       : pickedFields;
//   }, []);

//   return <>{fields}</>;
