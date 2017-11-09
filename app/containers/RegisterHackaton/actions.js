import { Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux';
import payment from '../../services/payment';
import {
  IS_REGISTER
} from './constants';

/**
 * Receiver callback from container and send it to reducer
 * for updating feeds
 */
export function isRegister(status) {
  return {
    type: IS_REGISTER,
    status
  };
}

export function registerHackaton(link, callback = () => ({})) {
  return (dispatch) => {
    dispatch(isRegister(true));
    const data = {
      order_details: [
        {
          count: 1,
          ticket_id: 10
        }
      ],
      payment_type: 'offline',
      hacker_team_name: link
    };
    payment
      .post(data)
      .then((response) => {
        if (response.data && response.data.meta.success) {
          callback({
            ...response.data.data,
            ...response.data.included[0]
          });
          dispatch(isRegister(false));
          Alert.alert(
            'Anda telah terdaftar!',
            'Terimakasih telah mendaftar sebagai peserta hackaton. Silahkan cek email untuk info lebih lanjut mengenai DevSummit hackathon.',
            [
              { text: 'OK', onPress: () => Actions.pop() }
            ]
          );
        } else {
          dispatch(isRegister(false));
          Toast.show('You already registered as hackaton');
        }
      })
      .catch((error) => {
        Toast.show('Failed to register, please try again', Toast.LONG);
        console.log('ERROR', error);
      });
  };
}
