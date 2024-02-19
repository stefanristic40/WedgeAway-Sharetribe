import React, { useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { GrSubtractCircle } from 'react-icons/gr';

import css from './Accordion.module.css';

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={css.item}>
      <div onClick={toggleAccordion} className={css.header}>
        <h3 className={css.title}>{title}</h3>
        <div>
          {isOpen ? (
            <GrSubtractCircle size={26} className={css.subIcon} />
          ) : (
            <IoIosAddCircleOutline size={30} />
          )}
        </div>
      </div>
      {isOpen && (
        <div className={css.content}>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;
