import {
  NETWORK_CHANGE,
  NETWORK_STATUS_CHANGE,
} from './constants';

export const setIsOnline = (value) => {
  return {
    type: NETWORK_STATUS_CHANGE,
    value
  }
}
export const setConnectionType = (value) => {
  return {
    type: NETWORK_CHANGE,
    value
  }
}
