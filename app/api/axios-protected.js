import axios from 'axios';
import { getStore } from '../redux/store';
import { getTokenByRefresh } from './axios-auth';
import { loginSuccess, logout } from '../redux/actionCreator/auth-action-creator';

const instance = axios.create();

// Add a request interceptor
// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   return response;
// }, function (error) {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   return Promise.reject(error);
// });

function addAuthHeader(config) {
  const store = getStore();
  const { accessToken } = store.getState().auth;

  // test code
  // let { accessToken } = store.getState().auth;

  // if (Math.random() <= 0.5) {
  //   accessToken = 'a';
  // }

  const newConfig = { ...config, headers: { Authorization: `Bearer ${accessToken}` }, timeout: 10000 };
  return newConfig;
}

function accessDeniedRetry(error) {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest.is_retry) {
    const store = getStore();
    const { refreshToken } = store.getState().auth;

    return getTokenByRefresh(refreshToken).then((getTokenResult) => {
      const newAccessToken = getTokenResult.accessToken;
      const newRefreshToken = getTokenResult.refreshToken;
      const newExpiredTime = getTokenResult.expiresIn;

      if (getTokenResult.isError) {
        store.dispatch(logout());
        return Promise.reject(error);
      }

      store.dispatch(loginSuccess(newAccessToken, newRefreshToken, newExpiredTime));

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      originalRequest.is_retry = true; // eslint-disable-line no-underscore-dangle

      return axios(originalRequest);
    })
      .catch((err) => Promise.reject(err));
  }

  return Promise.reject(error);
}

instance.interceptors.request.use(
  addAuthHeader,
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  accessDeniedRetry,
);

export default instance;
