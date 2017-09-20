import { fromJS } from 'immutable';

import { UPDATE_SINGLE_INPUT_FIELD } from './constants';

const initialState = fromJS({
    inputFields: {
        code: ''
    },
    visible: false
});

function codeRedeemReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SINGLE_INPUT_FIELD:
            return state.setIn(['inputFields', action.field], action.value);
        default:
            return state;
    }
}

export default codeRedeemReducer;