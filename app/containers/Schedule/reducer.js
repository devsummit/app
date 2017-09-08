import { fromJS } from 'immutable';

import { FETCH_USER_SCHEDULE } from './constants';

const initialState = fromJS({
    userSchedule: []
});

function scheduleListReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_SCHEDULE:
            return state.set('userSchedule', action.payloads);
        default:
            return state;
    }
}

export default scheduleListReducer;
