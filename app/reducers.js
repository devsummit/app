import { combineReducers } from 'redux-immutable';

// reducers import
import MainReducer from './containers/Main/reducer';
import RegisterReducer from './containers/Register/reducer';

const rootReducers = combineReducers({
	main: MainReducer,
	register: RegisterReducer
})


export default rootReducers;