import {Login_Constants} from './login-constant';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case Login_Constants.GET_LOGIN_SUCCESS:
      return {
        ...state,
        GetLoginSuccess: action.payload,
        GetLoginFail: null,
      };
    case Login_Constants.GET_LOGIN_FAIL:
      return {
        ...state,
        GetLoginSuccess: null,
        GetLoginFail: action.payload,
      };
    case Login_Constants.RESET_LOGIN_STATE:
      return {
        ...state,
        GetLoginSuccess: null,
        GetLoginFail: null,
      };
    default:
      return state;
  }
}
