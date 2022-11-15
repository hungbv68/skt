import axios from 'axios';
import { Platform } from 'react-native';
import { getItemAsync, setItemAsync } from 'expo-secure-store';
import * as Application from 'expo-application';
import { getStore } from '../redux/store';
import { ApiKeyConnect } from '../redux/actionCreator/auth-action-creator';
import { KEY_API_APP } from '../asyncStoreKey/async-store-key';
// eslint-disable-next-line import/named
import getKeyApiForApp from './axios-no-auth';
import configIndex from '../config';

const instance = axios.create();

function addKeyApiConnect(config) {
  const store = getStore();
  const { keyApiConnect } = store.getState().apiNoAuthor;
  const newConfig = { ...config, headers: { ApiKey: keyApiConnect }, timeout: 10000 };
  return newConfig;
}

async function accessDeniedRetry(error) {
  const originalRequest = error.config;
  const store = getStore();
  const { keyApiConnect } = store.getState().auth;
  const keyApiNoAuthor = await getItemAsync(KEY_API_APP);

  if (error.response != null && error.response.status === 401 && !originalRequest.is_retry) {
    if (!keyApiConnect) {
      if (!keyApiNoAuthor) {
        const data = await getKeyApiForApp();
        if (!data.isError) {
          store.dispatch(ApiKeyConnect(data.keyApi, data.apiClient, data.keyApiServer));
          setItemAsync(KEY_API_APP, data.keyApi)
            .then((err) => console.log(`persist failed! ${err}`)).catch((err) => console.log(`persist failed! ${err}`));
          originalRequest.headers.ApiKey = data.keyApi;
          originalRequest.is_retry = true; // eslint-disable-line no-underscore-dangle

          return axios(originalRequest);
        }
      }
      let applicationId;
      if (Platform.OS === 'ios') {
        (async () => {
          applicationId = await Application.getIosIdForVendorAsync();
        })();
      } else {
        applicationId = Application.androidId;
      }
      store.dispatch(
        ApiKeyConnect(keyApiNoAuthor, applicationId, configIndex.api.no_auth.keyApiServer),
      );

      originalRequest.headers.ApiKey = keyApiNoAuthor;
      originalRequest.is_retry = true; // eslint-disable-line no-underscore-dangle

      return axios(originalRequest);
    }
  }
  if (!keyApiConnect) {
    if (!keyApiNoAuthor) {
      const data = await getKeyApiForApp();
      if (data.isError) {
        store.dispatch(ApiKeyConnect(data.keyApi, data.apiClient, data.keyApiServer));
        setItemAsync(KEY_API_APP, data.keyApi)
          .then((err) => console.log(`persist failed! ${err}`)).catch((err) => console.log(`persist failed! ${err}`));
        originalRequest.headers.ApiKey = data.keyApi;
        originalRequest.is_retry = true; // eslint-disable-line no-underscore-dangle

        return axios(originalRequest);
      }
    }
    let applicationId;
    if (Platform.OS === 'ios') {
      (async () => {
        applicationId = await Application.getIosIdForVendorAsync();
      })();
    } else {
      applicationId = Application.androidId;
    }
    store.dispatch(
      ApiKeyConnect(keyApiNoAuthor, applicationId, configIndex.api.no_auth.keyApiServer),
    );

    originalRequest.headers.ApiKey = keyApiNoAuthor;
    originalRequest.is_retry = true; // eslint-disable-line no-underscore-dangle

    return axios(originalRequest);
  }
  return Promise.reject(error);
}

instance.interceptors.request.use(
  addKeyApiConnect,
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  accessDeniedRetry,
);

export default instance;
