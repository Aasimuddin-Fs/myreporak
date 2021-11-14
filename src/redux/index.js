/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';

import Auth from './Auth/login-reducer';
import UserInfo from './UserInfo/UserInfo-reducer';

const rootReducer = combineReducers({
  Auth,
  UserInfo,
});

export default rootReducer;
