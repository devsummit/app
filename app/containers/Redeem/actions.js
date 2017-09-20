import {
    DevSummitAxios,
    getAccessToken
} from '../../helpers';
import { Alert } from 'react-native';

import local from '../../../config/local';
import { UPDATE_SINGLE_INPUT_FIELD } from './constants';

export function updateInputFields(field, value) {
    return {
        type: UPDATE_SINGLE_INPUT_FIELD,
        field,
        value
    };
}

export function placeRedeem () {
    return (dispatch, getState) => {
        const { inputFields } = getState().get('code').toJS();
        const { code } = inputFields;

        getAccessToken()
            .then((token) => {
                DevSummitAxios.patch('api/v1/redeemcodes', { code },
                { headers: {Authorization: token} })
                .then((res) => {
                    Alert.alert('Information', res.data.meta.message);
                });
            });
    };
}