import {
  AUTH_SUCCESS,
  AUTH_FAIL,
} from './types.js';

export const login = (username, password, token) => {
  return {
      type: 'LOGIN',
      username: username,
      password: password,
      token: token,
  };
};

export const logout = () => {
  return {
      type: 'LOGOUT'
  };
};

export const signup = (username, password) => {
  return (dispatch) => {
  };
};

