import { combineReducers } from 'redux-immutable';

// reducers import
import MainReducer from './containers/Main/reducer';
import RegisterMenuReducer from './containers/RegisterMenu/reducer';
import RegisterPhoneReducer from './containers/RegisterPhone/reducer';
import RegisterEmailReducer from './containers/RegisterEmail/reducer';
import ChangePasswordReducer from './containers/ChangePassword/reducer';
import NewOrderReducer from './containers/NewOrder/reducer';

const rootReducers = combineReducers({
  main: MainReducer,
  registerMenu: RegisterMenuReducer,
  registerEmail: RegisterEmailReducer,
  registerPhone: RegisterPhoneReducer,
  changePassword: ChangePasswordReducer,
  newOrder: NewOrderReducer
})

export default rootReducers;
