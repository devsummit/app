import { Platform } from 'react-native';

export default {
  API_BASE_URL: '',
  CLIENT_SECRET: 'supersecret',

  FB_CLIENT_ID: '216608565531165',
  FB_CLIENT_SECRET: '0463ed52bd8a400dd48d8e9cc246acc4',

  TWITTER_CALLBACK: 'devsummit://authorize',
  TWITTER_CONSUMER_KEY: 'iJoptl48l8j5OseOI1lrS3r9N',
  TWITTER_CONSUMER_KEY_SECRET: 'eJBRnVvE0YplptEelYJOuHYw2YLdOf9v39YNnfdM6Rkv3kNShC',

  GOOGLE_CALLBACK_URL: 'http://localhost/google',
  GOOGLE_CLIENT_ID: '1091376735288-sgpfaq0suha3qakagrsig7bee58enkqr.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: 'ZdbNXvmMTy9dcAK8oW-3QPOj',

  PAYPAL_CLIENT_ID: 'Ac-Ikn76GlVB5tFLwMoFYEl9FGumrB7NYdkicE5bd7Q_QfWmnKDyK_ZlZ7mFB-MlENIQR1fTvcj1Ivdv',
  PAYPAL_CURRENCY: 'USD',
  PAYPAL_RATE: Math.pow(10, 4),
  PAYPAL_ENV: Platform.OS === 'android' ? 'sandbox' : 0,

  QISCUS_SDK_APP_ID: 'summitdev-qmorajj8iz3',
  QISCUS_SDK_SECRET: '4c70dc9c7a086b8a1be364c0cfc4274d',
  QISCUS_DEFAULT_ROOMS_ID: [ '52069' ]
};
