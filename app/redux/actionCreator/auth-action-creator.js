import * as Action from '../reduxAction/auth-action';
import * as AuthApi from '../../api/axios-auth';
// import { LoaderStart, LoaderStop } from './loader-action-creator';

const beginLogin = () => ({
  type: Action.BEGIN_LOGIN,
});

const loginSuccess = (accessToken, refreshToken, tokenExpiredTime) => {
  const tokenRefreshTime = (new Date().getTime()) + tokenExpiredTime * 1000 - 120000;

  return {
    type: Action.LOGIN_SUCCESS,
    payload: {
      accessToken, refreshToken, tokenRefreshTime,
    },
  };
};

const loginError = (errorCode, errorNetwork) => ({
  type: Action.LOGIN_ERROR,
  payload: {
    errorCode,
    errorNetwork,
  },
});

const logout = () => ({
  type: Action.LOG_OUT,
});
const afterLoginError = () => ({
  type: Action.AFTER_LOGIN_ERROR,
});

const login = (username, password) => async (dispatch) => {
  dispatch(beginLogin());
  // dispatch(LoaderStart());
  const tokenGetResult = await AuthApi.getTokenByPassword(username, password);
  // dispatch(LoaderStop());
  if (tokenGetResult.isError) {
    dispatch(loginError(tokenGetResult.errorCode, tokenGetResult.errorNetwork));
    return;
  }
  dispatch(loginSuccess(tokenGetResult.accessToken, tokenGetResult.refreshToken));
};

// const refreshAccessToken = (refreshToken) => async (dispatch) => {
//   const tokenGetResult = await AuthApi.getTokenByRefresh(refreshToken);
//   if (tokenGetResult.isError) {
//     dispatch(logout());
//   }

//   dispatch(loginSuccess(tokenGetResult.accessToken, tokenGetResult.refreshToken));
// };

const ApiKeyConnect = (keyApiConnect, keyApiClient, keyApiServer) => ({
  type: Action.KEY_API_CONNECT,
  payload: {
    keyApiConnect,
    keyApiClient,
    keyApiServer,
  },
});

export {
  login,
  logout,
  loginSuccess,
  ApiKeyConnect,
  afterLoginError,
};
