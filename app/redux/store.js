import { configureStore } from '@reduxjs/toolkit';
import { isAvailableAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import initialState from './initial-state';
import appReducer from './reducer/app-reducer';
import { LOG_OUT } from './reduxAction/auth-action';
import persistAuthMiddleware from './customMiddleware/persistAuthMiddleware';
import { REFRESH_TOKEN, KEY_API_APP } from '../asyncStoreKey/async-store-key';
import { getTokenByRefresh } from '../api/axios-auth';
import getKeyApiForApp from '../api/axios-no-auth';

let store = null;

export const initResult = {
  store: null,
  isError: false,
};
function logPersistError(err) {
  console.log(`persist failed! ${err}`);
}
function logPersistSuccess() {
  console.log('persist success!');
}
const rootReducer = (state, action) => {
  const { type } = action;
  if (type === LOG_OUT) {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return appReducer(state, action);
};

export async function initStore() {
  const result = {
    ...initResult,
  };
  const additionalMiddleware = [];
  const isStorageAvailable = await isAvailableAsync();
  if (isStorageAvailable) {
    additionalMiddleware.push(persistAuthMiddleware);
  }
  const reduxPreloadedState = { ...initialState };
  try {
    // kiểm tra key
    const keyApiNoAuthor = await getItemAsync(KEY_API_APP);
    if (!keyApiNoAuthor) {
      const apiKeyConnect = await getKeyApiForApp();
      if (apiKeyConnect.isError) {
        reduxPreloadedState.apiNoAuthor.keyApiConnect = apiKeyConnect.keyApi;
        reduxPreloadedState.apiNoAuthor.keyApiServer = apiKeyConnect.keyApiServer;
        reduxPreloadedState.apiNoAuthor.keyApiClient = apiKeyConnect.apiClient;
        await setItemAsync(KEY_API_APP, reduxPreloadedState.apiNoAuthor.keyApiConnect)
          .then(logPersistSuccess).catch(logPersistError);
      }
    }
    const storedRefreshToken = await getItemAsync(REFRESH_TOKEN);
    const refreshResult = await getTokenByRefresh(storedRefreshToken);
    if (!refreshResult.isError) {
      reduxPreloadedState.auth.isLogin = true;
      reduxPreloadedState.auth.refreshToken = refreshResult.refreshToken;
      reduxPreloadedState.auth.accessToken = refreshResult.accessToken;
      await setItemAsync(REFRESH_TOKEN, refreshResult.refreshToken)
        .then(logPersistSuccess).catch(logPersistError);
    }
  } catch (err) {
    result.isError = true;
  }

  result.store = configureStore({
    reducer: rootReducer,
    preloadedState: reduxPreloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(additionalMiddleware),
  });
  store = result.store;
  return result;
}

export const getStore = () => store;
