
export default {
  patch: () => PushNotif.patch('auth/me/updatefcmtoken', { token, headers })
};
