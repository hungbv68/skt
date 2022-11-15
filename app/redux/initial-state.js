export default {
  initiated: false,
  auth: {
    accessToken: null,
    refreshToken: null,
    tokenRefreshTime: null,
    fetchingToken: false,
    isError: false,
    errorCode: null,
    isLogin: false,
    errorNetwork: false,
  },
  apiNoAuthor: {
    keyApiConnect: null,
    keyApiServer: null,
    keyApiClient: null,
  },
  user: {
    isGetError: false,
    gettingDetail: true,
    getDetailSuccess: false,
    errorText: '',
    data: {
      sex: 0,
      fullName: '',
      userName: '',
      dateOfBirth: null,
      email: '',
      emailVerified: '',
      phoneNumber: '',
      urlAvatar: '',
    },
  },
  loader: {
    loading: false,
  },
};
