import Api from './api';

export default {
  patch: code => Api.put('/redeemcodes', code)
}
;
