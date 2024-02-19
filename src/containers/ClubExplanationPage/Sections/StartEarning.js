import React from 'react';

import css from './StartEarning.module.css';

function StartEarning(props) {
  const steps = [
    {
      image: '/static/images/steps/step1.png',
      title: 'Create Your Listing',
      description:
        "It's free and super easy. Just type in your club details, pick what perks you wanna include, and throw in some photos.",
    },
    {
      image: '/static/images/steps/step2.png',
      title: 'Set your availability.',
      description:
        "Select the dates you're open to future bookings for, and block off the ones you wish to keep reserved.",
    },
    {
      image: '/static/images/steps/step3.png',
      title: 'Start getting bookings.',
      description:
        "When guests discover your property, they'll submit booking inquiries for you to evaluate and approve.",
    },
    {
      image: '/static/images/steps/step4.png',
      title: 'Rent your clubs & get paid!',
      description:
        "Once a rental concludes, funds are directly transferred to your account. WedgeAway earns only when you do — it's as simple as that.",
    },
  ];

  return (
    <div className="n-container">
      <div className={css.content}>
        <h1 className={css.title}>Start Earning With Your Clubs!</h1>
        <p className={css.description}>
          There’s no up-front fee. No minimum number of reservations. And you can stop hosting at
          any time.
        </p>
        <div>
          {steps.map((step, index) => (
            <div key={step.title} className={css.item}>
              <div className={css.itemLeftSection}>
                <img src={step.image} alt={step.title} className={css.itemImg} />
              </div>
              <div className={css.itemContent}>
                <h2 className={css.itemTitle}>
                  {index + 1}. {step.title}
                </h2>
                <p className={css.itemDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StartEarning;
