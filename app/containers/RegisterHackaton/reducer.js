import { fromJS } from 'immutable';
import {
  IS_REGISTER,
} from './constants';

const initialState = fromJS({
  isFetching: false
});

function registerHackatonReducer(state = initialState, action) {
  switch (action.type) {
    case IS_REGISTER:
      return state.set('isRegistering', action.status);

    default:
      return state;
  }
}

export default registerHackatonReducer;
