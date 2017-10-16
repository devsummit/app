const config = require('../../../config/local').default;

export const FB_CLIENT_ID = config.FB_CLIENT_ID;
export const FB_CLIENT_SECRET = config.FB_CLIENT_SECRET;

export const GOOGLE_CALLBACK_URL = config.GOOGLE_CALLBACK_URL;
export const GOOGLE_CLIENT_ID = config.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = config.GOOGLE_CLIENT_SECRET;

export const TWITTER_CALLBACK = config.TWITTER_CALLBACK;
export const TWITTER_CONSUMER_KEY = config.TWITTER_CONSUMER_KEY;
export const TWITTER_CONSUMER_KEY_SECRET = config.TWITTER_CONSUMER_KEY_SECRET;

export const UPDATE_SINGLE_FIELD = 'app/containers/Main/UPDATE_FIELD';
export const UPDATE_IS_LOGGED_IN = 'app/containers/Main/CHECK_IS_LOGGED_IN';
export const UPDATE_IS_SUBSCRIBED = 'app/containers/Main/UPDATE_IS_SUBSCRIBED';
export const UPDATE_IS_LOADING = 'app/containers/Main/UPDATE_IS_LOADING';

export const SET_TOKEN = 'app/containers/Main/SET_TOKEN';
