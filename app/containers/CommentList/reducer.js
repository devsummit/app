import { fromJS } from 'immutable';

import {
  FETCH_COMMENT_LIST,
  FETCH_MORE_COMMENT_LIST,
  IS_FETCHING_COMMENTS,
  IS_FETCHING_MORE_COMMENTS,
  SET_LINKS,
  UPDATE_CURRENT_PAGE,
  RESTORE_CURRENT_PAGE,
  UPDATE_COMMENT,
  IS_SUBMITTING_COMMENT,
  SUBMIT_COMMENT
} from './constants';

const initialState = fromJS({
  comments: [],
  links: {},
  text: '',
  isFetching: false,
  isFetchingMore: false,
  IsSubmiting: false,
  currentPage: 1
});

function commentListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENT_LIST:
      return state.set('comments', fromJS(action.payloads));
    case IS_FETCHING_COMMENTS:
      return state.set('isFetching', action.status);
    case IS_FETCHING_MORE_COMMENTS:
      return state.set('isFetchingMore', action.status);
    case SET_LINKS:
      return state.set('links', fromJS(action.links));
    case FETCH_MORE_COMMENT_LIST:
      return state.set(
        'comments',
        fromJS(
          state
            .get('comments')
            .toJS()
            .concat(action.payloads)
        )
      );
    case UPDATE_COMMENT:
      return state.set('text', action.value);
    case UPDATE_CURRENT_PAGE:
      return state.set('currentPage', action.value);
    case RESTORE_CURRENT_PAGE:
      return state.set('currentPage', 1);
    case IS_SUBMITTING_COMMENT:
      return state.set('isSubmitting', action.status);
    case SUBMIT_COMMENT:
      return state.set('comments', fromJS([action.data, ...state.get('comments').toJS()]))
    default:
      return state;
  }
}

export default commentListReducer;
