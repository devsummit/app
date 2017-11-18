import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import Moment from 'moment';
import base from 'base-64';
import {
  API_BASE_URL,
  CLIENT_SECRET,
  PRIMARYCOLOR,
  QISCUS_SDK_APP_ID,
  QISCUS_SDK_SECRET,
  QISCUS_DEFAULT_ROOM_ID,
  QISCUS_MODERATOR_EMAIL
} from './constants';

// import { updateIsLogOut } from './containers/Profile/actions';

export const DevSummitAxios = axios.create({
  baseURL: API_BASE_URL
});

export const decodeToken = (token) => {
  const base64Url = token.split('.')[0];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(base.decode(base64));
};

export const getAccessToken = async () => {
  let token = await AsyncStorage.getItem('access_token');
  // decode token to acquire exp data
  // check token expiry with new Date().getTime()
  // if still true return the token
  // if not send refresh token to backend
  // if back end response invalid token logout user

  if (!token) {
    // if token does not exist
    return token;
  }

  const tokenExp = decodeToken(token);
  const exp = Math.floor(new Date().getTime() / 1000);

  // if not expired
  if (exp < tokenExp.exp) {
    return token;
  }

  const refreshToken = await AsyncStorage.getItem('refresh_token');

  await DevSummitAxios.post('/auth/refreshtoken', { refresh_token: refreshToken })
    .then(async (response) => {
      if (response.data.data && response.data.data.exist === false) {
        const keys = [ 'access_token', 'refresh_token', 'role_id', 'profile_data' ];
        await AsyncStorage.multiRemove(keys);
        return Actions.main();
      }
      const { access_token: accessToken, refresh_token: refreshtoken } = response.data.data;
      await AsyncStorage.multiSet([ [ 'access_token', accessToken ], [ 'refresh_token', refreshtoken ] ]);
      token = accessToken;
    })
    .catch(err => err);
  return token;
};

export const getRoleId = async () => {
  const roleId = await AsyncStorage.getItem('role_id');
  return JSON.parse(roleId);
};

export const getProfileData = async () => {
  const profileData = await AsyncStorage.getItem('profile_data');
  return JSON.parse(profileData);
};

export const getProfileEmail = async () => {
  const profileEmail = await AsyncStorage.getItem('profile_email');
  return JSON.parse(profileEmail);
};

export const getBoothData = async () => {
  const boothData = await AsyncStorage.getItem('booth_data');
  return JSON.parse(boothData);
};

export const formatDate = (source) => {
  const dt = source.split(' ');
  return `${dt[0]} ${dt[1]}`;
};

export const localeDate = (date) => {
  return Moment.utc(date)
    .local()
    .format('YYYY-MM-DD HH:mm:ss');
};

export const localeDateWithoutHour = (date) => {
  return Moment.utc(date)
    .locale([ 'en', 'id' ])
    .format('DD MMM YYYY');
};

export const expiryDate = (date) => {
  return Moment.utc(date)
    .add(1, 'hours')
    .local()
    .format('YYYY-MM-DD HH:mm:ss');
};

export const transactionStatus = (payment) => {
  if (payment) {
    if (payment.fraud_status === 'accept' && payment.transaction_status === 'capture') {
      return {
        message: 'paid',
        color: 'green'
      };
    } else if (payment.fraud_status === 'challenge') {
      return {
        message: 'waiting for authorization',
        color: 'blue'
      };
    } else if (payment.transaction_status === 'pending') {
      return {
        message: 'pending',
        color: 'red'
      };
    }
    return {
      message: payment.transaction_status,
      color: 'grey'
    };
  }
  return {
    message: 'not paid',
    color: PRIMARYCOLOR
  };
};

// Qiscus Helpers
export const QiscusAxios = axios.create({
  baseURL: `https://${QISCUS_SDK_APP_ID}.qiscus.com/api/v2/rest`,
  headers: {
    'Content-Type': 'application/json',
    QISCUS_SDK_SECRET
  }
});

export const addRoomParticipant = async (emails = [], room_id ) => {
  try {
    const response = await QiscusAxios.post('/add_room_participants', { room_id, emails });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getModeratorRoomList = async (page = 1) => {
  try {
    const response = await QiscusAxios.get(`get_user_rooms?user_email=${QISCUS_MODERATOR_EMAIL}&page=${page}&show_participants=true`)
    const roomsInfo = await response.data.results.rooms_info;
    const roomsId = [];
    roomsInfo.forEach((room) => {
      if (room.room_type === 'group') {
        return roomsId.push(room.room_id_str);
      }
    });
    return roomsId;
  } catch (error) {
    console.error(error);
  }
};
export const getRoomWithTarget = async (email1, email2) => {
  try {
    const response = await QiscusAxios.get(`get_or_create_room_with_target?emails[]=${email1}&emails[]=${email2}`);
    return response.data.results.room;
  } catch (error) {
    console.error(error);
  }
};

export const getBoothRoomId = () => {
    AsyncStorage.getItem('room_id')
      .then((results) => {
        const rooms = JSON.parse(results);
        const room = rooms.''+ this.props.booth_id;

        return roomId;
      }).catch(() => console.log('Error'));
}
