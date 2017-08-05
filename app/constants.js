/**
 *  Base URL for all API requests
 */
const config = require('../config/local').default

export const API_BASE_URL = config.API_BASE_URL

export const role_option = [
    { 
        value: "key0",
        label: "attendee"
    },
    { 
        value: "key1",
        label: "booth"
    },
    { 
        value: "key2",
        label: "speaker"
    }
];