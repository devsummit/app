import { DevSummitAxios, getAccessToken } from '../../helpers';

/*
 * import constants
 */
import {
  SET_ORDER_LIST,
  IS_FETCHING_ORDERS
} from './constants';

// update fetch transaction status
export function updateIsFetchingOrders(status) {
  return {
    type: IS_FETCHING_ORDERS,
    status
  };
}

export function getOrderList() {
  return (dispatch) => {
    dispatch(updateIsFetchingOrders(true));
    getAccessToken().then((accessToken) => {
      DevSummitAxios.get('/api/v1/orders', {
        headers: { Authorization: accessToken }
      }).then((response) => {
        console.log(response);
        if (response.data && response.data.meta.success) {
          dispatch({
            type: SET_ORDER_LIST,
            data: response.data.data
          });
          dispatch(updateIsFetchingOrders(false));
        }
      })
        .catch((err) => { console.log(err.response); });
    }).catch(() => { console.log('fail get access token'); });
  };
}
