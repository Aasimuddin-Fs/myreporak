import {USER_INFO_CONST} from './UserInfo-constants.js';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case USER_INFO_CONST.SET_USER_INFO_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
        getUserDetailsFailed: null,
      };
    case USER_INFO_CONST.GET_USERINFO_FAILED:
      return {
        ...state,
        userDetails: null,
        getUserDetailsFailed: action.payload,
      };
    case USER_INFO_CONST.RESET_USERINFO_STATE:
      return {
        ...state,
        userDetails: null,
        getUserDetailsFailed: null,
      };
    default:
      return state;
  }
}
