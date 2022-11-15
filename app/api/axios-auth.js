import axios from 'axios';
import config from '../config';
/* #region helper function */
const { tokenEndpoint, tokenContentType, baseURI } = config.api.auth;
const instance = axios.create({
  baseURL: baseURI,
  timeout: 10000,
});

const tokenApiResult = {
  isError: false,
  errorCode: null,
  errorText: '',
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  errorNetwork: false,
};

// function convertObjToEncodeUrl(body) {
//   if (typeof body === 'object' && body !== null) {
//     throw new Error('post body is not an object');
//   }
//   const formBody = [];
//   Object.keys(body).forEach((property) => {
//     const encodedKey = encodeURIComponent(property);
//     const encodedValue = encodeURIComponent(body[property]);
//     formBody.push(`${encodedKey}=${encodedValue}`);
//   });
//   const result = formBody.join('&');
//   return result;
// }

async function callTokenApi(postContent) {
  const result = {
    ...tokenApiResult,
  };
  const params = new URLSearchParams(postContent);

  await instance.post(tokenEndpoint, params, {
    headers: { 'Content-Type': tokenContentType },
  }).then((response) => {
    if (response.status !== 200) {
      result.isError = true;
      result.errorCode = response.status;
      result.errorNetwork = false;
      result.errorText = response.statusText;
      return result;
    }
    if (!response.data.access_token) {
      result.isError = true;
      result.errorNetwork = false;
      // need an error code table
      result.ErrorCode = 999;
      return result;
    }
    result.errorNetwork = false;
    result.accessToken = response.data.access_token;
    result.refreshToken = response.data.refresh_token;
    result.expiresIn = response.data.expires_in;
    return result;
  }).catch((error) => {
    result.isError = true;
    result.errorCode = error.code;
    result.errorText = error.message;
    result.errorNetwork = error.message === 'Network Error';
    return result;
  });
  return result;
}
async function getTokenByPassword(username, password) {
  const postContent = {
    client_id: 'ktts-mobile',
    username,
    password,
    grant_type: 'password',
  };

  return callTokenApi(postContent);
}
async function getTokenByRefresh(refreshToken) {
  const postContent = {
    client_id: 'ktts-mobile',
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  };

  return callTokenApi(postContent);
}

export { getTokenByRefresh, getTokenByPassword };
/* #endregion */
