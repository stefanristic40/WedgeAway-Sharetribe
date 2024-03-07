import React from 'react';

import css from './Faq.module.css';
import Accordion from './Accordion/Accordion';

function Faqs(props) {
  const faqs = [
    {
      question: 'How do I know the clubs are authentic?',
      answer:
        'All golf club hosts are required to agree to WedgeAway’s Terms & Conditions, which state that all listings are accurate. This includes the brand, model, year and condition of the clubs presented in the listings. If the clubs you pickup or receive are not as described in the listing, please reach out to our team for assistance.',
    },
    {
      question: 'What happens if a club gets damaged?',
      answer:
        'WedgeAway holds your credit card information just in case a club you are using is damaged. Both you and the seller will be required to submit photos and a written statement about the damage and incident. If you (the renter) is at fault, we will assess the damage and the market value of the club. You will be charged market value for the damage caused to the club.',
    },
    {
      question: 'Can I extend my rental during my trip?',
      answer:
        'You can request an extension during your rental period. The club host will have the ability to approve or decline your request depending on their availability, and are not required to extend your rental beyond the original booking time. We will of course always do our best to accommodate you and any special requests!',
    },
    {
      question: 'What happens if I lose a club?',
      answer:
        'If you lose a club as a renter, you will be charged the fair market value of that club. That value will be based on year, brand, condition and other factors.',
    },
    {
      question: 'Who do I contact if the clubs were not as picture/promoted?',
      answer: 'You can contact our support team at support@wedgeaway.com.',
    },
    {
      question: 'Can I speak to another guest who has rented these clubs?',
      answer:
        'You are not able to directly communicate with previous guests, but you can read reviews to ensure you are renting the best clubs possible!',
    },
  ];

  return (
    <div>
      <div className={css.title}>Frequently Asked Questions</div>

      <div>
        {faqs.map(faq => (
          <Accordion key={faq.question} title={faq.question} content={faq.answer} />
        ))}
      </div>
    </div>
  );
}

export default Faqs;
