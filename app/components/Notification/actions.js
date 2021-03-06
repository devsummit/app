import { DevSummitAxios, getAccessToken } from '../../helpers';
import axios from 'axios';
import {
  SET_NOTIFICATION,
  IS_FETCHING_NOTIFICATION,
  ADD_NEXT_NOTIFICATION,
  SET_NEXT_URL
} from './constants';

export function updateIsFetchingNotification(status) {
  return {
    type: IS_FETCHING_NOTIFICATION,
    status
  }
}

export function fetchNotification() {
  return (dispatch) => {
    dispatch(updateIsFetchingNotification(true))
    getAccessToken().then((token) => {
      const headers = { Authorization: token }
      DevSummitAxios.get('/api/v1/notifications?page=1', { headers })
        .then((response) => {
          dispatch({
            type: SET_NOTIFICATION,
            payload: response.data.data
          })
          dispatch({
            type: SET_NEXT_URL,
            value: response.data.links.next
          })
          dispatch(updateIsFetchingNotification(false))
        }).catch(err => {
          console.log(err)
          dispatch(updateIsFetchingNotification(false))
        })
    }).catch(err => {
      console.log(err)
      dispatch(updateIsFetchingNotification(false))

    })
  }
}

export function fetchNextNotification() {
  return (dispatch, getState) => {
    dispatch(updateIsFetchingNotification(true))
    const nextUrl = getState().toJS().notificationList.nextUrl;
    if (nextUrl) {
      getAccessToken().then((token) => {
        const headers = { Authorization: token }
        axios.get(nextUrl, { headers })
          .then((response) => {
            dispatch({
              type: ADD_NEXT_NOTIFICATION,
              payload: response.data.data
            })
            dispatch({
              type: SET_NEXT_URL,
              value: response.data.links.next
            })
            dispatch(updateIsFetchingNotification(false))
          }).catch(err => {
            console.log(err)
            dispatch(updateIsFetchingNotification(false))
          })
      }).catch(err => {
        console.log(err)
        dispatch(updateIsFetchingNotification(false))
      })
    } else {
      dispatch(updateIsFetchingNotification(false))
    }
  }
}
