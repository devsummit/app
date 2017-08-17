import { combineReducers } from 'redux-immutable';

// reducers import
import MainReducer from './containers/Main/reducer';
import RegisterMenuReducer from './containers/RegisterMenu/reducer';
import RegisterPhoneReducer from './containers/RegisterPhone/reducer';
import RegisterEmailReducer from './containers/RegisterEmail/reducer';
import ChangePasswordReducer from './containers/ChangePassword/reducer';
import TicketListReducer from './containers/TicketList/reducer';
import AttendeesListReducer from './containers/AttendeesList/reducer';

const rootReducers = combineReducers({
  main: MainReducer,
  registerMenu: RegisterMenuReducer,
  registerEmail: RegisterEmailReducer,
  registerPhone: RegisterPhoneReducer,
  changePassword: ChangePasswordReducer,
  ticketList: TicketListReducer,
  attendeesList: AttendeesListReducer
})

export default rootReducers;
