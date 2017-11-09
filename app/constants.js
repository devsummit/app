/**
 *  Base URL for all API requests
 */
const config = require('../config/local').default;

export const API_BASE_URL = config.API_BASE_URL;
export const MIDTRANS_CLIENT_KEY = config.MIDTRANS_CLIENT_KEY;
export const PAYPAL_CLIENT_ID = config.PAYPAL_CLIENT_ID;
export const PAYPAL_CURRENCY = config.PAYPAL_CURRENCY;
export const PAYPAL_RATE = config.PAYPAL_RATE;
export const PAYPAL_ENV = config.PAYPAL_ENV;

// TODO MERCHANT CODE FOR DEVELOPMENT
export const MERCHANT_CODE = config.MIDTRANS_MERCHANT_ID;

export const CLIENT_SECRET = config.CLIENT_SECRET;

export const role_option = [
  {
    value: 'key0',
    label: 'attendee'
  },
  {
    value: 'key1',
    label: 'booth'
  }
  // {
  //   value: 'key2',
  //   label: 'hackaton'
  // }
];

export const ROLES = {
  2: 'attendee',
  3: 'booth',
  4: 'speaker',
  5: 'hackaton'
};

export const FEEDBACK_URL = 'https://devsummit.io/feedback.html';

export const PRIMARYCOLOR = '#f39e21';

export const SECTIONS = [
  {
    ticket_type: 'Package Small',
    title: 'STARTUP',
    price: '2.600.000',
    gifts: [ '1 x-banner', 'free 3 tickets', 'stiker' ]
  },
  {
    ticket_type: 'Package Medium',
    title: 'FAST-GROWTH',
    price: '10.000.000',
    gifts: [ '1 x-banner', 'free 5 tickets', 'stiker' ]
  },
  {
    ticket_type: 'Package Big',
    title: 'ENTERPRISE',
    price: '15.000.000',
    gifts: [ '1 x-banner', 'free 10 tickets', 'stiker' ]
  }
];

export const SECTIONS2 = [
  {
    ticket_type: 'hackaton',
    title: 'REGISTER',
    price: '1.600.000',
    gifts: [ 'ABC', 'free 3 redeem codes', 'free mineral water' ]
  }
];

// export const isConfirm = false;
