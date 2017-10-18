import {
  DevSummitAxios,
  getAccessToken
} from '../../helpers';

import {
  FETCH_SPEAKER_LIST
} from './constants';

import speaker from '../../services/speaker';

/*
 * Get speaker data
*/

export default function fetchSpeakerList() {
  return (dispatch) => {
    speaker.get()
      .then((response) => {
        dispatch({
          type: FETCH_SPEAKER_LIST,
          payloads: response.data.data
        });
      });
  };
}
