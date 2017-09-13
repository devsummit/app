import {
    DevSummitAxios,
    getAccessToken
} from '../../helpers';

import { FETCH_USER_SCHEDULE } from './constants';
import { orderByDay } from './index';

export function fetchUserSchedule() {
    return (dispatch) => {
        getAccessToken()
        .then((token) => {
            const headers = { Authorization: token };
            DevSummitAxios.get('api/v1/schedules' + orderByDay, { headers })
                .then((response) => {
                    dispatch({
                        type: FETCH_USER_SCHEDULE,
                        payloads: response.data.data
                    });
                    console.log(response.data);
                })
                .catch((error) => { return console.log(error.response); });
        }).catch((err) => { console.log(err); });
    };
}
