import { DevSummitAxios, getAccessToken } from '../../helpers';

/*
 * import constants
 */
import {
  SET_ORDER_LIST
} from './constants';

export function getOrderList() {
  return (dispatch) => {
    getAccessToken().then((accessToken) => {
      DevSummitAxios.get('/api/v1/orders', {
        headers: { Authorization: accessToken }
      }).then((response) => {
        if (response.data && response.data.meta.success) {
          dispatch({
            type: SET_ORDER_LIST,
            data: response.data.data
          });
        }
      })
        .catch((err) => { console.log(err.response); });
    }).catch(() => { console.log('fail get access token'); });
  };
}
