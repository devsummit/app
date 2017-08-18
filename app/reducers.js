import { combineReducers } from 'redux-immutable';

// reducers import
import MainReducer from './containers/Main/reducer';
import RegisterMenuReducer from './containers/RegisterMenu/reducer';
import RegisterPhoneReducer from './containers/RegisterPhone/reducer';
import RegisterEmailReducer from './containers/RegisterEmail/reducer';
import TicketListReducer from './containers/TicketList/reducer';
import AttendeesListReducer from './containers/AttendeesList/reducer';
import changePasswordReducer from './containers/ChangePassword/reducer';
import ProfileReducer from './containers/Profile/reducer';

const rootReducers = combineReducers({
  main: MainReducer,
  registerMenu: RegisterMenuReducer,
  registerEmail: RegisterEmailReducer,
  registerPhone: RegisterPhoneReducer,
  ticketList: TicketListReducer,
  attendeesList: AttendeesListReducer,
  changePassword: changePasswordReducer,
  profile: ProfileReducer
})

export default rootReducers;
