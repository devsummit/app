import Toast from 'react-native-simple-toast';
import { DevSummitAxios, getAccessToken, getProfileData } from '../../helpers';
import { updateDataStorage } from '../Profile/actions';
import orderlist from '../../services/orderlist';

/*
 * import constants
 */
import {
  SET_ORDER_LIST,
  IS_FETCHING_ORDERS,
  IS_CONFIRMING_PAYMENT,
  SET_CONFIRM_PAYMENT,
  PENDING_ORDERS,
  REDEEM_COUNTER,
  UPDATE_SINGLE_INPUT_FIELD,
  IS_CONFIRM_EMAIL,
  IS_CONFIRMING_EMAIL,
  FETCH_COMMUNITY
} from './constants';

export function isConfirmingEmail(status) {
  return {
    type: IS_CONFIRMING_EMAIL,
    status
  };
}

export function setConfirmEmail(email, callBack = () => {}) {
  return () => {
    orderlist.postConfirmEmail(email).then((response) => {
      const data = response.data.meta;

      if (data.success) {
        callBack();
        Toast.show(data.message);
      } else {
        Toast.show(data.message);
      }
    })
      .catch((err) => {
        console.log(err, 'Error Cauhgt')
      })
  };
}

export function updateInputFields(field, value) {
  return {
    type: UPDATE_SINGLE_INPUT_FIELD,
    field,
    value
  };
}

export function redeemCounter() {
  return (dispatch) => {
    orderlist.countRedeem().then((profile) => {
      const value = profile.data.data.referal_count;
      dispatch({
        type: REDEEM_COUNTER,
        value
      });
      dispatch(updateDataStorage(profile.data));
    });
  };
}

export function submitReferal() {
  return (dispatch) => {
    orderlist
      .claimReward()
      .then((response) => {
        const value = response.data.meta.success ? 11 : 0;
        dispatch({
          type: REDEEM_COUNTER,
          value
        });
        Toast.show(response.data.meta.message, Toast.LONG);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

// update fetch transaction status
export function updateIsFetchingOrders(status) {
  return {
    type: IS_FETCHING_ORDERS,
    status
  };
}

export function pendingOrder(value) {
  return {
    type: PENDING_ORDERS,
    value
  };
}

export function emailConfirm() {
  return (dispatch) => {
    orderlist.countRedeem().then((response) => {
      if (response.data.data.confirmed === 1) {
        dispatch({
          type: IS_CONFIRM_EMAIL,
          value: true
        });
      }
    });
  };
}

export function getOrderList() {
  return (dispatch) => {
    dispatch(updateIsFetchingOrders(true));
    dispatch(redeemCounter());
    dispatch(emailConfirm());
    orderlist
      .get()
      .then((response) => {
        if (response.data && response.data.meta.success) {
          const validOrder = response.data.data.filter(item => item.payment);
          dispatch({
            type: SET_ORDER_LIST,
            data: validOrder
          });
          let pendingCounter = 0;
          response.data.data.map((order) => {
            if (!order.payment || order.payment.transaction_status !== 'capture') {
              pendingCounter += 1;
            }
          });
          dispatch(pendingOrder(pendingCounter));
          dispatch(updateIsFetchingOrders(false));
        }
      })
      .catch((err) => {
        dispatch(updateIsFetchingOrders(false));
        console.log(err.response);
      });
  };
}

export function updateIsConfirmingPayment(status) {
  return {
    type: IS_CONFIRMING_PAYMENT,
    status
  };
}

export function confirmPayment(id, idx) {
  return (dispatch) => {
    dispatch(updateIsConfirmingPayment(true));
    orderlist
      .update(id)
      .then((response) => {
        if (response.data && response.data.data) {
          dispatch({
            type: SET_CONFIRM_PAYMENT,
            payload: response.data.data,
            idx
          });
        }
        dispatch(updateIsConfirmingPayment(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function register(callBack) {
  return (dispatch, getState) => {
    const { inputFields } = getState()
      .get('registerEmail')
      .toJS();

    const { email } = inputFields || null;

    // const { lastName, referer } = inputFields || '';

    // const role_id = role === 'attendee' ? 2 : role === 'booth' ? 3 : 5;
    const data = {
      email
    };

    if (email) {
      DevSummitAxios.post('/auth/register', data)
        .then(async (response) => {
          const resData = response.data.data;
          const roleId = JSON.stringify(response.data.included.role_id);
          const profileData = JSON.stringify(response.data.included);
          try {
            if (response && response.data.data && response.data.meta.success) {
              AsyncStorage.multiSet([
                [ 'access_token', resData.access_token ],
                [ 'refresh_token', resData.refresh_token ],
                [ 'role_id', roleId ],
                [ 'profile_data', profileData ]
              ]);
              dispatch(updateRegisterStatus(true, 'Success', 'You have been registered'));
              callBack();
            } else if (response.data.data !== null && !response.data.meta.success) {
              dispatch(updateRegisterStatus(true, 'Registered', 'You already registered'));
            } else if (response.data.data === null && !response.data.meta.success) {
              dispatch(
                updateRegisterStatus(
                  true,
                  'Failed',
                  response.data.meta.message.concat(' please login using your existing account')
                )
              );
            }
          } catch (err) {
            console.log(err, 'error cought');
          }
        })
        .catch((error) => {
          console.log(error, 'error caught');
        });
    }
  };
}

export function getCommunity() {
  return (dispatch) => {
    orderlist
      .fetchCommunity()
      .then((res) => {
        const payloads = res.data.data;

        dispatch({ type: FETCH_COMMUNITY, payloads });
      })
      .catch((err) => {
        console.log(err, 'error caught');
      });
  };
}
