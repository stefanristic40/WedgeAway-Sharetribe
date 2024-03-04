import React from 'react';
import EditListingEachInfo from '../EditListingEachInfo';

import css from './EachClubDetail.module.css';

export const EachClubDetail = props => {
  const { listingType, listingFieldsConfig, intl, id, type, values } = props;
  const id1 = type == 1 ? id - 1 : id;
  const id2 = type == 1 ? id - 2 : type == 2 ? id - 3 : id;
  return (
    <div>
      <div className={css.putterDetailItem}>
        <h4 className={css.itemTitle}>{listingFieldsConfig[1 + id]['filterConfig']['label']}</h4>
        {/* In My Bag */}
        <EditListingEachInfo
          listingType={listingType}
          fieldConfig={listingFieldsConfig[1 + id]}
          intl={intl}
        />
        {/* Year */}
        {values[`pub_${listingFieldsConfig[1 + id].key}`] && (
          <EditListingEachInfo
            listingType={listingType}
            fieldConfig={listingFieldsConfig[2 + id]}
            intl={intl}
          />
        )}
      </div>
      {values[`pub_${listingFieldsConfig[1 + id].key}`] && (
        <div>
          <div className={css.itemAttributes}>
            {/* Brand */}
            <EditListingEachInfo
              listingType={listingType}
              fieldConfig={listingFieldsConfig[3 + id]}
              intl={intl}
            />
            {/* Model */}
            <EditListingEachInfo
              listingType={listingType}
              fieldConfig={listingFieldsConfig[4 + id]}
              intl={intl}
            />
            {/* Head Type */}
            <EditListingEachInfo
              listingType={listingType}
              fieldConfig={listingFieldsConfig[5 + id]}
              intl={intl}
            />
            {/* Head Loft */}
            <EditListingEachInfo
              listingType={listingType}
              fieldConfig={listingFieldsConfig[6 + id]}
              intl={intl}
            />
            {/* Head Weight */}
            <EditListingEachInfo
              listingType={listingType}
              fieldConfig={listingFieldsConfig[7 + id]}
              intl={intl}
            />
            {/* Lenght */}
            <EditListingEachInfo
              listingType={listingType}
              fieldConfig={listingFieldsConfig[8 + id]}
              intl={intl}
            />
            {/* Hosel */}
            <EditListingEachInfo
              listingType={listingType}
              fieldConfig={listingFieldsConfig[9 + id]}
              intl={intl}
            />
            {/* Offset */}
            {type != 2 && (
              <EditListingEachInfo
                listingType={listingType}
                fieldConfig={listingFieldsConfig[10 + id]}
                intl={intl}
              />
            )}
            {/* Toe Hang */}
            {type != 1 && type != 2 && (
              <EditListingEachInfo
                listingType={listingType}
                fieldConfig={listingFieldsConfig[11 + id1]}
                intl={intl}
              />
            )}
            {/* Lie Angle */}
            {type != 1 && type != 2 && (
              <EditListingEachInfo
                listingType={listingType}
                fieldConfig={listingFieldsConfig[12 + id1]}
                intl={intl}
              />
            )}
          </div>
          <div className={css.itemRow}>
            {/* Shaft */}
            <EditListingEachInfo
              listingType={listingType}
              fieldConfig={listingFieldsConfig[13 + id2]}
              intl={intl}
            />
          </div>
          <div className={css.itemRow}>
            {/* Grip */}
            <EditListingEachInfo
              listingType={listingType}
              fieldConfig={listingFieldsConfig[14 + id2]}
              intl={intl}
            />
          </div>
        </div>
      )}
    </div>
  );
};
