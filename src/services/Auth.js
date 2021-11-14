import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Get_Login_Failed, Get_Login_Success} from '../redux/Auth/login-action';
import {Login_Constants} from '../redux/Auth/login-constant';
import {checkHttpStatus, parseJSON} from './ServiceHelper';

export const Login = formData => async (dispatch, getState) => {
  await axios
    .post(`https://reqres.in/api/login`, formData)
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      console.log('Login API data....... ', JSON.stringify(response));
      if (response) {
        AsyncStorage.setItem('accessToken', response.token);
        dispatch(
          Get_Login_Success(Login_Constants.GET_LOGIN_SUCCESS, {
            response: {
              statusCode: 200,
              data: response,
            },
          }),
        );
      } else {
        dispatch(
          Get_Login_Failed(Login_Constants.GET_LOGIN_FAIL, {
            error: {
              statusCode: response.error.error,
              statusText: response.error.errorDescription,
              isSuccess: response.isSuccess,
            },
          }),
        );
      }
    })
    .catch(error => {
      console.log('USER INFO API error....... ', error.response.data);
      dispatch(
        Get_Login_Failed(Login_Constants.GET_LOGIN_FAIL, {
          error: {
            statusText: error.response?.data?.error,
            netWorkError: true,
          },
        }),
      );
    });
};
