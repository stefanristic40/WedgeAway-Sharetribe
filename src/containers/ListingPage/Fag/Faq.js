import React from 'react';

import css from './Faq.module.css';
import Accordion from './Accordion/Accordion';

function Faqs(props) {
  const faqs = [
    {
      question: 'How much money can I make hosting my clubs?',
      answer:
        'The sky is the limit! The money you make depends on the brand, age and quality of the clubs you have. Our top earners earn over $20,000 per year.',
    },
    {
      question: 'How do I know my clubs are in good hands when renting them out?',
      answer:
        'As club owners you have total control on WedgeAway. We require renters to complete ID verification prior to booking. You can approve or decline any booking requests that you receive and you can communicate with renters before you accept any booking request. If you are not comfortable with a renter using your clubs, you can decline the request as you please.',
    },
    {
      question: 'What happens if my a club is damaged or isn’t returned?',
      answer:
        'Your clubs are always protected with the WedgeAway Guarantee. We give you an estimated value of your clubs. Your renter will have a card on file, and that card is charged automatically if there is any damage, or your clubs are not returned.',
    },
    {
      question: 'How do I get paid?',
      answer:
        "Upon registration, get ready to submit your banking information via our secure website. Stripe, our thirdparty processor, will safeguard your account details. LandTrust does not keep any financial data. After a trip finishes, LandTrust will start transferring the funds to the landowner's account, with direct deposit typically taking 1-2 business days.",
    },
    {
      question: 'Do I need to be there when a guest picks up the clubs?',
      answer:
        "You don't need to be there when the renter picks up the clubs . Just provide pickup details, any special access information such as an access code and rules in your listing. WedgeAway will send any info to renters after you approve their booking. Set it up once, and let WedgeAway handle the rest.",
    },
    {
      question: 'What happens if I get a bad review?',
      answer:
        'Reviews are extremely important as a golf club owner and host. People typically prefer renting with a host that has built up good reviews and a great track record. If you get a bad review and feel that the review is not justified, please reach out to our support team. We will work with both you and the renter to see if there is a solution to remedy the situation.',
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
