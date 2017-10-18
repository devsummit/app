

export default {
  post: (username, password, Auth) => Auth.post('/auth/login', { username, password }),
  post2: (email, headers, Auth) => Auth.post2('/newsletters', { email, headers })
};
