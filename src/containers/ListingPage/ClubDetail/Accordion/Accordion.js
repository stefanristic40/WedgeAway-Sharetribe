import React, { useEffect, useState } from 'react';
import { IoIosAddCircleOutline, IoIosAdd } from 'react-icons/io';
import { GrSubtractCircle, GrSubtract } from 'react-icons/gr';

import css from './Accordion.module.css';

const extractSubstring = str => {
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== str[i].toLowerCase()) {
      return str.substring(0, i);
    }
  }
  return str; // Return the whole string if no uppercase letter is found
};

const Accordion = props => {
  const { listing, name, listingConfig } = props;
  const [clubName, setClubName] = useState('');
  useEffect(() => {
    const tmp = extractSubstring(name);
    setClubName(tmp);
  }, [name]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // const displayedName = listingConfig?.listingFields
  const foundObject = listingConfig?.listingFields?.find(obj => obj.key === name);
  const publicData = listing?.attributes?.publicData;

  console.log('foundOjbect', foundObject);

  console.log('listing', listing);

  return (
    <div className={css.item}>
      <div onClick={toggleAccordion} className={css.clubDetailSubHead}>
        <div className={css.title && css.item1}>{foundObject?.showConfig?.label}</div>
        <div className={css.title && css.item2}>
          {publicData && publicData[`${clubName}Brand`]
            ? publicData && publicData[`${clubName}Brand`]
            : 'Not Set'}
        </div>
        <div className={css.title && css.item3}>
          {publicData && publicData[`${clubName}Model`]
            ? publicData && publicData[`${clubName}Model`]
            : 'Not Set'}
        </div>

        <div className={css.item4}>
          {isOpen ? <GrSubtract size={15} className={css.subIcon} /> : <IoIosAdd size={30} />}
        </div>
      </div>
      {isOpen && (
        <div className={css.content}>
          <div>• &nbsp;Head Type: &nbsp;{publicData && publicData[`${clubName}HeadType`]}</div>
          {/* <p>{publicData && publicData[`${clubName}Shaft`]}</p> */}
        </div>
      )}
    </div>
  );
};

export default Accordion;
