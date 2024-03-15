import React from 'react';
import EditListingEachInfo from '../EditListingEachInfo';

import css from './EachClubDetail.module.css';

export const EachBagDetail = props => {
  const { listingType, listingFieldsConfig, intl, id } = props;
  return (
    <div>
      <div className={css.putterDetailItem}>
        <h4 className={css.itemTitle}>{listingFieldsConfig[3 + id]['filterConfig']['label']}</h4>
      </div>
      <div className={css.itemRow}>
        <EditListingEachInfo
          listingType={listingType}
          fieldConfig={listingFieldsConfig[3 + id]}
          intl={intl}
        />
      </div>
    </div>
  );
};
