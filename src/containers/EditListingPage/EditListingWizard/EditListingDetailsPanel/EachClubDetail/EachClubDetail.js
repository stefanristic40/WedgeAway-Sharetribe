import React from 'react';
import EditListingEachInfo from '../EditListingEachInfo';

import css from './EachClubDetail.module.css';

export const EachClubDetail = props => {
  const { listingType, listingFieldsConfig, intl, id, type, values } = props;
  const idNew = id + 1;
  const id1 = type == 1 ? idNew - 1 : idNew;
  const id2 = type == 1 ? idNew - 2 : type == 2 ? idNew - 3 : idNew;
  // const id1 = type == 1 ? id : id + 1;
  // const id2 = type == 1 ? id - 1 : type == 2 ? id - 2 : id + 1;

  return (
    <div>
      <div className={css.putterDetailItem}>
        <h4 className={css.itemTitle}>{listingFieldsConfig[1 + idNew]['filterConfig']['label']}</h4>
        {/* In My Bag */}
        <EditListingEachInfo
          listingType={listingType}
          fieldConfig={listingFieldsConfig[1 + idNew]}
          intl={intl}
        />
        {/* Year */}
        {values[`pub_${listingFieldsConfig[1 + idNew].key}`] && (
          <EditListingEachInfo
            listingType={listingType}
            fieldConfig={listingFieldsConfig[2 + idNew]}
            intl={intl}
          />
        )}
      </div>
      {values[`pub_${listingFieldsConfig[1 + idNew].key}`] && (
        <div>
          <div className={css.itemAttributes}>
            {/* Brand */}
            <EditListingEachInfo
              listingType={listingType}
              fieldConfig={listingFieldsConfig[3 + idNew]}
              intl={intl}
            />
            {/* Model */}
            <EditListingEachInfo
              listingType={listingType}
              fieldConfig={listingFieldsConfig[4 + idNew]}
              intl={intl}
            />
            {/* Head Type */}
            <EditListingEachInfo
              listingType={listingType}
              fieldConfig={listingFieldsConfig[5 + idNew]}
              intl={intl}
            />
            {/* Head Loft */}
            <EditListingEachInfo
              listingType={listingType}
              fieldConfig={listingFieldsConfig[6 + idNew]}
              intl={intl}
            />
            {/* Head Weight */}
            <EditListingEachInfo
              listingType={listingType}
              fieldConfig={listingFieldsConfig[7 + idNew]}
              intl={intl}
            />
            {/* Lenght */}
            <EditListingEachInfo
              listingType={listingType}
              fieldConfig={listingFieldsConfig[8 + idNew]}
              intl={intl}
            />
            {/* Hosel */}
            <EditListingEachInfo
              listingType={listingType}
              fieldConfig={listingFieldsConfig[9 + idNew]}
              intl={intl}
            />
            {/* Offset */}
            {type != 2 && (
              <EditListingEachInfo
                listingType={listingType}
                fieldConfig={listingFieldsConfig[10 + idNew]}
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
