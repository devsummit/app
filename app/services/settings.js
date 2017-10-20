export default {
  patch: (firstName, lastName, boothInfo, job, summary, Auth) => Auth.patch('/auth/me/changesetting', {firstName, lastName, boothInfo, job, summary})
};
