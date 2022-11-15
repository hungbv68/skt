export default {
  api: {
    auth: {
      baseURI: 'http://192.168.1.22:44360',
      tokenEndpoint: '/connect/token',
      tokenContentType: 'application/x-www-form-urlencoded',
      registerEndpoint: '/api/user/register',
      userInfoEndpoint: '/connect/userinfo',
      changePasswordEndpoint: '/api/user/changepassword',
      resetPasswordEndpoint: '/api/user/reset-password',
      fogotPassword: '/api/user/forgot-password',
    },
    no_auth: {
      keyApiServer: 'KttsAppApiServerClient',
      getApiConnect: '/api/managekeyapi/get-api-for-client',
    },
    finhouData: {
      baseURI: 'http://192.168.1.22:44361',
      account: {
        getUserInfo: '/api/account/userinfo',
        updateUserInfo: '/api/account/update-user-info',
        listRoleCurrent: '/api/common/list-role-of-member',
        switchRole: '/api/common/switch-role',
      },
    },
  },
};
