import { fromJS } from 'immutable';

import {
  FETCH_COMMENT_LIST,
  IS_FETCHING_COMMENTS,
  UPDATE_COMMENT,
  IS_SUBMITTING_COMMENTS,
  SUBMIT_COMMENT
} from './constants';

const initialState = fromJS({
  comments: [],
  text: '',
  isFetching: false,
  IsSubmiting: false
});

function commentListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENT_LIST:
      return state.set('comments', fromJS(action.payloads));
    case IS_FETCHING_COMMENTS:
      return state.set('isFetching', action.status);
    case UPDATE_COMMENT:
      return state.set('text', action.value);
    case IS_SUBMITTING_COMMENTS:
      return state.set('isSubmitting', action.status);
    case SUBMIT_COMMENT:
      return state.set('comments', fromJS([action.data, ...state.get('comments').toJS()]))
    default:
      return state;
  }
}

export default commentListReducer;
