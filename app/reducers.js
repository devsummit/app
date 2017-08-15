import { combineReducers } from 'redux-immutable';

// reducers import
import MainReducer from './containers/Main/reducer';
import RegisterPhoneReducer from './containers/RegisterPhone/reducer';
import RegisterEmailReducer from './containers/RegisterEmail/reducer';
import ChangePasswordReducer from './containers/ChangePassword/reducer';

const rootReducers = combineReducers({
  main: MainReducer,
  registerEmail: RegisterEmailReducer,
  registerPhone: RegisterPhoneReducer,
  changePassword: ChangePasswordReducer
})

export default rootReducers;
