import * as SecureStore from 'expo-secure-store';
import { LOGIN_SUCCESS, LOG_OUT, REFRESH_ACCESS_TOKEN } from '../reduxAction/auth-action';
import { REFRESH_TOKEN, KEY_API_APP } from '../../asyncStoreKey/async-store-key';

function logPersistError(err) {
  console.log(`persist failed! ${err}`);
}

function logPersistSuccess() {
  console.log('persist success!');
}

// eslint-disable-next-line no-unused-vars
const persistAuthMiddleware = (store) => (next) => (action) => {
  if (action.type === LOGIN_SUCCESS || action.type === REFRESH_ACCESS_TOKEN) {
    SecureStore.setItemAsync(REFRESH_TOKEN, action.payload.refreshToken)
      .then(logPersistSuccess).catch(logPersistError);
  }

  if (action.type === LOG_OUT) {
    SecureStore.deleteItemAsync(REFRESH_TOKEN).catch(logPersistError)
      .then(logPersistSuccess).catch(logPersistError);
  }
  if (action.type === KEY_API_APP) {
    SecureStore.setItemAsync(KEY_API_APP, action.payload.keyApiConnect)
      .then(logPersistSuccess).catch(logPersistError);
  }
  return next(action);
};

export default persistAuthMiddleware;
