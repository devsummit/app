import {
  DevSummitAxios,
  getAccessToken
} from '../../helpers';

import {
  FETCH_COMMENT_LIST,
  FETCH_MORE_COMMENT_LIST,
  IS_FETCHING_COMMENTS,
  IS_FETCHING_MORE_COMMENTS,
  IS_SUBMITTING_COMMENT,
  UPDATE_COMMENT,
  SUBMIT_COMMENT,
  SET_LINKS,
  UPDATE_CURRENT_PAGE
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

export function isFetchingMoreComments(status) {
  return {
    type: IS_FETCHING_MORE_COMMENTS,
    status
  };
}

export function updateCurrentPage(value) {
  return {
    type: UPDATE_CURRENT_PAGE,
    value
  };
}

export function isSubmittingComment(status) {
  return {
    type: IS_SUBMITTING_COMMENT,
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
            const payloads = response.data.data;
            const links = response.data.links;
            await dispatch({ type: FETCH_COMMENT_LIST, payloads });
            await dispatch({ type: SET_LINKS, links })

            dispatch(isFetchingComments(false))
          })
          .catch((err) => {
            dispatch(isFetchingComments(false));
            console.log('landing here error', err);
          });
      });
  };
}

export function fetchMoreComments() {
  return (dispatch, getState) => {
    const { links } = getState().get('comments').toJS();
    dispatch(isFetchingMoreComments(true));

    getAccessToken()
      .then((token) => {
        const headers = { Authorization: token };
        comment.moreComments(links.next)
          .then(async (response) => {
            const payloads = response.data.data;
            const links = response.data.links;
            await dispatch({ type: FETCH_MORE_COMMENT_LIST, payloads });
            dispatch({ type: SET_LINKS, links })

            dispatch(isFetchingMoreComments(false))
          })
          .catch((err) => {
            dispatch(isFetchingMoreComments(false));
            console.log('landing here error', err);
          });
      });
  };
}

export function submitComment(id) {
  return (dispatch, getState) => {
    const { text } = getState().get('comments').toJS();

    const content = text;
    dispatch(isSubmittingComment(true));
    getAccessToken()
      .then((token) => {
        const headers = { Authorization: token };
        comment.postComment(id, content)
          .then((response) => {
            dispatch(updateCommentList(response.data.data));
            dispatch(isSubmittingComment(false));
          })
          .catch((err) => {
            dispatch(isSubmittingComment(false));
            console.log('landing here error', err)
          });
      });
  }
}
