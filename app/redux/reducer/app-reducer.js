import initialState from '../initial-state';
import authReducer from './auth/auth-reducer';
// import * as General from '../reduxAction/general-action';

export default function appReducer(state = initialState, action) {
  return {
    ...state,
    auth: authReducer(state.auth, action),
  };
}
