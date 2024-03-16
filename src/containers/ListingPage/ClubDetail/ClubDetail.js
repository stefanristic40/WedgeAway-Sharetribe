import React from 'react';
import Accordion from './Accordion/Accordion';
import css from './ClubDetail.module.css';
export const ClubDetail = props => {
  const { listing, listingConfig } = props;
  const setNames = listing?.attributes?.publicData?.Choose_Your_Set;
  const bagName = listing?.attributes?.publicData?.golfbagName;

  return (
    <div>
      {setNames?.map((set, index) => (
        <Accordion key={index} name={set} listing={listing} listingConfig={listingConfig} />
      ))}
      {!!bagName && <div className={css.bagBrand}>Golf Bag: {bagName}</div>}
    </div>
  );
};
