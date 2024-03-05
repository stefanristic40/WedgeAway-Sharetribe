import React from 'react';
import Accordion from './Accordion/Accordion';
import css from './ClubDetail.module.css';
export const ClubDetail = props => {
  const { listing, listingConfig } = props;
  const setNames = listing?.attributes?.publicData?.Choose_Your_Set;
  console.log('setNames:', setNames);
  console.log('listingConfig:', listingConfig);

  return (
    <div>
      {setNames?.map((set, index) => (
        <Accordion key={index} name={set} listing={listing} listingConfig={listingConfig} />
      ))}
      <div className={css.bagBrand}>
        Golf Bag: {listing?.attributes?.publicData?.golfbagBrandName}
      </div>
    </div>
  );
};
