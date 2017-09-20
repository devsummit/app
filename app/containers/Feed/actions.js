import {
  FETCH_FEEDS,
  IS_FETCHING_FEEDS,
  POST_FEEDS,
  IS_POST_FEEDS
} from './constants';

import {
  DevSummitAxios,
  getAccessToken
} from '../../helpers';

export function fetchFeeds() {

  return (dispatch) => {

    dispatch(isFetchingFeeds(true))

    getAccessToken()
    .then((token) => {

      DevSummitAxios.get('/api/v1/feeds', { headers: { Authorization: token } })
        .then((response) => {

          const payloads = response.data.data;

          console.log("actions", payloads)

          dispatch({ type: FETCH_FEEDS, payloads });

          dispatch(isFetchingFeeds(false));

        })
        .catch(err => console.log(err))

    });
  }

}

export function isFetchingFeeds(status) {
  return {
    type: IS_FETCHING_FEEDS,
    status
  }
}

export function postFeeds() {
  return (dispatch) => {

    dispatch(isPostFeeds(true));

    getAccessToken()
      .then((token) => {

        const headers = { Authorization: token }

        DevSummitAxios.post('api/v1/feeds',  { headers })
          .then((response) => {

            const payloads = response.data;

            dispatch({ type: POST_FEEDS, payloads});

            dispatch(isPostFeeds(false));

          })
          .catch(err => console.log(err))
      });
  }
}

export function isPostFeeds(status) {
  return {
    type: IS_FETCHING_FEEDS,
    status
  }
}

