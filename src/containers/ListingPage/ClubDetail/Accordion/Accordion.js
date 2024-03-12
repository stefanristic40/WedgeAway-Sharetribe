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
          <div className={css.spaceZ}></div>
          {publicData && publicData[`${clubName}HeadType`] && (
            <div>•&nbsp;Head Type: &nbsp;{publicData[`${clubName}HeadType`]}</div>
          )}
          {publicData && publicData[`${clubName}Loft`] && (
            <div>•&nbsp;Head Loft: &nbsp;{publicData[`${clubName}Loft`]}°</div>
          )}
          {publicData && publicData[`${clubName}HeadWeight`] && (
            <div>•&nbsp;Head Weight: &nbsp;{publicData[`${clubName}HeadWeight`]}g</div>
          )}
          {publicData && publicData[`${clubName}Length`] && (
            <div>•&nbsp;Length: &nbsp;{publicData[`${clubName}Length`]}in</div>
          )}
          {publicData && publicData[`${clubName}Hosel`] && (
            <div>•&nbsp;Hosel: &nbsp;{publicData[`${clubName}Hosel`]}</div>
          )}
          {publicData && publicData[`${clubName}Offset`] && (
            <div>•&nbsp;Offset: &nbsp;{publicData[`${clubName}Offset`]}</div>
          )}
          {publicData && publicData[`${clubName}ToeHang`] && (
            <div>•&nbsp;Toe Hang: &nbsp;{publicData[`${clubName}ToeHang`]}°</div>
          )}
          {publicData && publicData[`${clubName}LieAngle`] && (
            <div>•&nbsp;Lie Angle: &nbsp;{publicData[`${clubName}LieAngle`]}°</div>
          )}
          {publicData && publicData[`${clubName}Loft`] && (
            <div>•&nbsp;Loft: &nbsp;{publicData[`${clubName}Loft`]}°</div>
          )}
          {publicData && publicData[`${clubName}Bounce`] && (
            <div>•&nbsp;Bounce: &nbsp;{publicData[`${clubName}Bounce`]}°</div>
          )}
          {publicData && publicData[`${clubName}Flex`] && (
            <div>•&nbsp;Flex: &nbsp;{publicData[`${clubName}Flex`]}</div>
          )}
          {publicData && publicData[`${clubName}Grind`] && (
            <div>•&nbsp;Grind: &nbsp;{publicData[`${clubName}Grind`]}</div>
          )}
          {publicData && publicData[`${clubName}Grind`] && (
            <div>•&nbsp;Head Type: &nbsp;{publicData[`${clubName}Grind`]}</div>
          )}
          {publicData && publicData[`${clubName}SwingWeight`] && (
            <div>•&nbsp;SwingWeight: &nbsp;{publicData[`${clubName}SwingWeight`]}g</div>
          )}
          {publicData && publicData[`${clubName}HeadSize`] && (
            <div>•&nbsp;Head Size: &nbsp;{publicData[`${clubName}HeadSize`]}cc</div>
          )}
          {publicData && publicData[`${clubName}Shaft`] && (
            <div>•&nbsp;Shaft Description: &nbsp;{publicData[`${clubName}Shaft`]}</div>
          )}
          {publicData && publicData[`${clubName}Grip`] && (
            <div>•&nbsp;Grip Description: &nbsp;{publicData[`${clubName}Grip`]}</div>
          )}
          <div className={css.spaceZ}></div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
