import * as LoginAction from '../../reduxAction/auth-action';

export default function noAuthReducer(state, action) {
  const { payload, type } = action;
  switch (type) {
    case LoginAction.KEY_API_CONNECT:
      return {
        ...state,
        keyApiConnect: payload.keyApiConnect,
        keyApiServer: payload.keyApiClient,
        keyApiClient: payload.keyApiServer,
      };
    default:
      return state;
  }
}
