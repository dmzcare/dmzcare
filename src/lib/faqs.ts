/** Shared FAQ copy for the homepage preview and /faqs page */

export type FaqItem = { question: string; answer: string };

export const FAQ_COLUMN_LEFT: FaqItem[] = [
  {
    question: "What areas do you serve?",
    answer:
      "We serve Louisville and nearby Kentucky counties, plus selected routes in southern Indiana. Share your pickup and destination when you book so we can confirm coverage.",
  },
  {
    question: "How can I book a ride?",
    answer:
      "Book online on our website, call dispatch, or ask your care coordinator or facility to contact us for you. Have addresses, appointment time, and mobility needs ready.",
  },
  {
    question: "Do you offer wheelchair-accessible vehicles?",
    answer:
      "Yes. We operate lift-equipped vehicles for manual and power wheelchairs and many scooters. Describe your equipment when you schedule so we send the right vehicle and securement.",
  },
  {
    question: "Are your drivers trained for patient assistance?",
    answer:
      "Yes. Drivers follow safe assistance and securement steps and focus on respectful, steady pacing at pickups and drop-offs.",
  },
  {
    question: "Is there an upfront payment required?",
    answer:
      "Whether you pay upfront depends on your payer, authorization, or private-pay agreement. We explain what applies before you confirm the ride.",
  },
  {
    question: "Can I schedule rides after hours?",
    answer:
      "Scheduling hours are listed on our site. If you need something outside those hours, call us and we will tell you what may be possible for your route and timing.",
  },
];

export const FAQ_COLUMN_RIGHT: FaqItem[] = [
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 24 to 48 hours before your appointment when you can. That helps us reserve the right vehicle and time window. Need something sooner? Call us and we will check availability.",
  },
  {
    question: "Can I bring a companion on my ride?",
    answer:
      "Often yes, when space and safety allow. Mention a companion when you book so we reserve seating and plan around equipment.",
  },
  {
    question: "What if my appointment runs late?",
    answer:
      "Tell dispatch as soon as you know your plans changed. We work with clinics and riders to adjust pickup times when schedules shift.",
  },
  {
    question: "How do you ensure vehicle safety and cleanliness?",
    answer:
      "We maintain vehicles on a regular schedule, inspect lifts and securement gear, and keep interiors clean between riders.",
  },
  {
    question: "Are your services covered by insurance?",
    answer:
      "Coverage depends on your plan, eligibility, and trip authorization. Share your situation when you book and we will point you to the right next steps or contacts.",
  },
  {
    question: "What types of appointments do you transport for?",
    answer:
      "We provide non-emergency medical transportation for visits such as doctor appointments, dialysis, therapy, imaging, dental, behavioral health, and hospital outpatient trips. Mention your appointment type when you schedule.",
  },
];

/** Flat list for metadata or search (optional use) */
export const FAQ_ALL: FaqItem[] = [...FAQ_COLUMN_LEFT, ...FAQ_COLUMN_RIGHT];
