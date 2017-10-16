import {
  NETWORK_CHANGE,
} from './constants';

export const setIsOnline = (value) => {
  console.log(NETWORK_CHANGE, value);
  return {
    type: NETWORK_CHANGE,
    value
  }
}
