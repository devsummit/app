import {
  DevSummitAxios,
  getAccessToken
} from '../../helpers';

import {
  FETCH_COMMENT_LIST,
  IS_FETCHING_COMMENTS,
  IS_SUBMITTING_COMMENTS,
  UPDATE_COMMENT,
  SUBMIT_COMMENT
} from './constants';

import comment from '../../services/comment';

/*
 * Get speaker data
*/

export function isFetchingComments(status) {
  return {
    type: IS_FETCHING_COMMENTS,
    status
  };
}

export function updateComment(value) {
  return {
    type: UPDATE_COMMENT,
    value
  };
}

export function updateCommentList(data) {
  return {
    type: SUBMIT_COMMENT,
    data
  };
}

export function fetchCommentList(id) {
  return (dispatch) => {
    dispatch(isFetchingComments(true));

    getAccessToken()
      .then((token) => {
        const headers = { Authorization: token };
        comment.getComments(id)
          .then(async (response) => {
            await dispatch({
              type: FETCH_COMMENT_LIST,
              payloads: response.data.data
            });
            dispatch(isFetchingComments(false))
          }).
          catch(err => console.log('landing here error', err));
      });
  };
}

export function submitComment(id) {
  return (dispatch, getState) => {
    const { text } = getState().get('comments').toJS();

    const content = text;
    // dispatch(isSubmittingComment(true));
    getAccessToken()
      .then((token) => {
        const headers = { Authorization: token };
        comment.postComment(id, content)
          .then((response) => {
            dispatch(updateCommentList(response.data.data));
          })
          .catch(err => console.log('landing here error', err));
      });
  }
}
