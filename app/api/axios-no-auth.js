import axios from 'axios';
import { Platform } from 'react-native';
import * as Application from 'expo-application';
import config from '../config';
/* #region helper function */
const { keyApiServer, getApiConnect } = config.api.no_auth;
const { baseURI } = config.api.finhouData;
let applicationId;
if (Platform.OS === 'ios') {
  (async () => {
    applicationId = await Application.getIosIdForVendorAsync();
  })();
} else {
  applicationId = Application.androidId;
}
const instance = axios.create({
  baseURL: baseURI,
  timeout: 10000,
});
const tokenApiResult = {
  isError: false,
  errorCode: null,
  errorText: '',
  keyApi: '',
  keyApiServer: '',
  apiClient: '',
};

async function callApiKey(postContent) {
  const result = {
    ...tokenApiResult,
  };
  try {
    const response = await instance.post(getApiConnect, postContent, {
      headers: { ApiKey: keyApiServer },
      timeout: 10000,
    });
    if (response.status !== 200) {
      result.isError = true;
      result.errorCode = response.status;
      result.errorText = response.statusText;
      return result;
    }
    if (response.data != null) {
      result.isError = true;
      result.keyApi = response.data;
      result.keyApiServer = keyApiServer;
      result.apiClient = applicationId;
      return result;
    }

    result.isError = true;
    result.errorCode = response.status;
    result.errorText = response.statusText;
    return result;
  } catch (error) {
    result.isError = true;
    result.errorCode = error.code;
    result.errorText = error.message;
    return result;
  }
}
async function getKeyApiForApp() {
  const postContent = {
    apiClient: applicationId,
    apiServer: keyApiServer,
  };
  return callApiKey(postContent);
}

export default getKeyApiForApp;
/* #endregion */
