/**
 *  Base URL for all API requests
 */
const config = require('../config/local').default;

export const API_BASE_URL = config.API_BASE_URL;
export const MIDTRANS_CLIENT_KEY = 'VT-client-g8cB-IVLwe64YIdv';

// TODO MERCHANT CODE FOR DEVELOPMENT
export const MERCHANT_CODE = 'M1066775';

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

export const PRIMARYCOLOR = '#f39e21';
