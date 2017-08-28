import {
  DevSummitAxios
} from '../../helpers';

/*
 * import constants
 */

import {
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_SINGLE_ERROR_FIELD,
  IS_FETCHING_TRANSACTION,
  GET_TRANSACTION_RESPONSE
} from './constants';

import {
  MIDTRANS_CLIENT_KEY
} from '../../constants';
/*
 * Update the input fields
 * @param {field: name of the field}
 * @param {value: value to be set}
 */
export function updateInputFields(field, value) {
  return {
    type: UPDATE_SINGLE_INPUT_FIELD,
    field,
    value
  };
}

/*
 * Update the error of input fields
 * @param {field: name of the field}
 * @param {value: value to be set}
 */
export function updateErrorFields(field, value) {
  return {
    type: UPDATE_SINGLE_ERROR_FIELD,
    field,
    value
  };
}

// update fetch transaction status
export function updateIsFetchingTransaction(status) {
  return {
    type: IS_FETCHING_TRANSACTION,
    status
  };
}

// update transaction response
export function updateGetTransactionResponse(payload) {
  return {
    type: GET_TRANSACTION_RESPONSE,
    payload
  };
}

// Send parameter to API

export function submitPayment() {
  return (dispatch, getState) => {
    dispatch(updateIsFetchingTransaction(true));
    const paymentMethod = getState().getIn([ 'methodPayment', 'inputFields' ]).toJS();
    const paymentDetail = getState().getIn([ 'detailPayment', 'inputFields' ]).toJS();

    const {
      emailDetail, firstName, lastName, phoneNumber, vaNumber, cardExpiryMonth,
      cardExpiryYear, grossAmount, orderId, cardNumber, cardCvv, descriptionDetail, lastDigitNumber,
      randomNumber, mandiriToken
    } = paymentDetail || '';
    const {
      bankDestination, paymentType
    } = paymentMethod || '';
    console.log(paymentMethod, paymentDetail);
    DevSummitAxios.post('api/v1/payments', {
      bank: bankDestination,
      payment_type: paymentType,
      gross_amount: 100000,
      order_id: orderId,
      email: emailDetail,
      first_name: firstName,
      last_name: lastName,
      phone: phoneNumber,
      va_number: vaNumber,
      card_exp_month: cardExpiryMonth,
      card_exp_year: cardExpiryYear,
      card_cvv: cardCvv,
      card_number: cardNumber,
      description: descriptionDetail,
      input1: lastDigitNumber,
      input3: randomNumber,
      token: mandiriToken,
      client_key: MIDTRANS_CLIENT_KEY
    }).then((response) => {
      console.log(response)
      dispatch(updateGetTransactionResponse(response.data));
      dispatch(updateIsFetchingTransaction(false));
    }).catch((err) => {
      console.log(err);
    });
  };
}
