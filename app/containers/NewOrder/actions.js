// import { AsyncStorage } from 'react-native';
import {
  DevSummitAxios,
  getAccessToken
} from '../../helpers';

/*
 * import constants
 */
import {
  SET_TICKET_TYPE
} from './constants';

export function getTicketType(res) {
  return (dispatch) => {
    getAccessToken().then((accessToken) => {
      DevSummitAxios.get('/api/v1/tickets', {
        headers: { Authorization: accessToken }
      }).then((response) => {
        if (response && response.data && response.data.meta.success) {
          dispatch({
            type: SET_TICKET_TYPE,
            data: response.data.data
          });
        }
      })
        .catch((err) => { console.log('error', err); });
    });
  };
}

export function placeOrder() {
  //
}
