import FormData from 'FormData';
import { Platform, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';
import Api from '../../services/api';
import payment from '../../services/payment';
import feeds from '../../services/feeds';
import {
  FETCH_FEEDS,
  SET_LINKS,
  IS_FETCHING_FEEDS,
  IS_FETCHING_MORE_FEEDS,
  UPDATE_FEEDS,
  UPDATE_CURRENT_PAGE,
  LOAD_MORE_FEEDS,
  REMOVE_FEED,
  IS_REMOVE_FEED,
  RESTORE_CURRENT_PAGE
} from './constants';

import { getAccessToken } from '../../helpers';

/**
 * Receiver callback from container and send it to reducer
 * for updating feeds
 */
export function updateFeeds(payload) {
  const data = JSON.parse(payload);
  const payloads = data.data;
  if (payloads) {
    return { type: UPDATE_FEEDS, payloads };
  }
}

export function updateCurrentPage(value) {
  return {
    type: UPDATE_CURRENT_PAGE,
    value
  };
}

export function isFetchingFeeds(status) {
  return {
    type: IS_FETCHING_FEEDS,
    status
  };
}

export function isFetchingMoreFeeds(status) {
  return {
    type: IS_FETCHING_MORE_FEEDS,
    status
  };
}

export function fetchFeeds(currentpage) {
  return (dispatch) => {
    dispatch(isFetchingFeeds(true));
    feeds
      .get(currentpage)
      .then((response) => {
        const payloads = response.data.data;
        const links = response.data.links;

        dispatch({ type: FETCH_FEEDS, payloads });
        dispatch({ type: SET_LINKS, links });

        dispatch(updateCurrentPage(currentpage));

        dispatch(isFetchingFeeds(false));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Alert.alert(
            'Logged out',
            'You are logged out from this device.',
            [
              { text: 'OK', onPress: () => Actions.main() }
            ]
          );
        } else {
          Toast('No internet connection, please try again.', Toast.LONG);
        }

        dispatch(isFetchingFeeds(false));
      });
  };
}

export function setTokenHeader(currentpage) {
  return (dispatch) => {
    getAccessToken().then((accessToken) => {
      Api.setAuthorizationToken(accessToken);
      dispatch(fetchFeeds(currentpage));
    });
  };
}

export function fetchPageWithPaginate(page) {
  return (dispatch) => {
    dispatch(isFetchingMoreFeeds(true));

    feeds
      .get(page + 1)
      .then((response) => {
        const payloads = response.data.data;
        const links = response.data.links;

        dispatch({ type: LOAD_MORE_FEEDS, payloads });
        dispatch({ type: SET_LINKS, links });

        dispatch(updateCurrentPage(page + 1));
        dispatch(isFetchingMoreFeeds(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(isFetchingMoreFeeds(false));
      });
  };
}

export function isRemoveFeed(status) {
  return {
    type: IS_REMOVE_FEED,
    status
  };
}

export function removeFeed(idFeed) {
  return (dispatch) => {
    dispatch(isRemoveFeed(true));

    dispatch({ type: REMOVE_FEED, id: idFeed });

    feeds
      .delete(idFeed)
      .then((res) => {
        Toast.show('Post has been removed');
        dispatch(isRemoveFeed(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function registerHackaton(name, callback = () => ({})) {
  return (dispatch) => {
    const data = {
      order_details: [
        {
          count: 1,
          ticket_id: 10
        }
      ],
      payment_type: 'offline',
      hacker_team_name: name
    };
    payment
      .post(data)
      .then((response) => {
        if (response.data && response.data.meta.success) {
          callback({
            ...response.data.data,
            ...response.data.included[0]
          });
          Toast.show('Your team has been registered');
        } else {
          Toast.show('You already registered as hackaton');
        }
      })
      .catch((error) => {
        Toast.show('Sorry, something went wrong');
        console.log('ERROR', error);
      });
  };
}

export function reportFeed(idFeed) {
  return () => {
    const payloads = {
      report_type: 'Harassment',
      feed_id: idFeed
    };

    feeds
      .report(payloads)
      .then((res) => {
        Toast.show('Thank you for make this feed a lovely place', Toast.LONG);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function restoreCurrentPage() {
  return {
    type: RESTORE_CURRENT_PAGE
  };
}
