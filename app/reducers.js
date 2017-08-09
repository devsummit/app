import { combineReducers } from 'redux-immutable';

// reducers import
import MainReducer from './containers/Main/reducer';
import RegisterReducer from './containers/Register/reducer';
import ChangePasswordReducer from './containers/ChangePassword/reducer';

const rootReducers = combineReducers({
	main: MainReducer,
	register: RegisterReducer,
	changePassword: ChangePasswordReducer
})

export default rootReducers;
