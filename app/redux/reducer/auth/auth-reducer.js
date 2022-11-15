import * as LoginAction from '../../reduxAction/auth-action';

export default function authReducer(state, action) {
  const { payload, type } = action;

  switch (type) {
    case LoginAction.BEGIN_LOGIN:
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        tokenRefreshTime: null,
        isError: false,
        errorCode: null,
        fetchingToken: true,
      };

    case LoginAction.LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        tokenRefreshTime: payload.tokenRefreshTime,
        fetchingToken: false,
        isLogin: true,
      };

    case LoginAction.LOGIN_ERROR:
      return {
        ...state,
        fetchingToken: false,
        isError: true,
        errorCode: payload.errorCode ? payload.errorCode : null,
        errorNetwork: payload.errorNetwork ? payload.errorNetwork : null,
      };
    case LoginAction.AFTER_LOGIN_ERROR:
      return {
        ...state,
        fetchingToken: false,
        isError: false,
        errorCode: null,
        errorNetwork: false,
      };
    case LoginAction.LOG_OUT:
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        tokenRefreshTime: null,
        fetchingToken: false,
        isError: false,
        errorCode: null,
        isLogin: false,
        errorNetwork: false,
      };
    default:
      return state;
  }
}
