// Login Authorization Actions

import UsersAPI from "../../../utils/usersAPI";
import * as actionTypes from "../../actionTypes/auth";

export const authLoginStart = () => {
  return {
    type: actionTypes.AUTH_LOGIN_START
  };
};

export const authLoginSuccess = res => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    authData: res.data
  };
};

export const authLoginFail = error => {
  return {
    type: actionTypes.AUTH_LOGIN_FAIL,
    error: error
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authLoginStart());
    UsersAPI.loginUser({
      username: username,
      password: password
    })
      .then(response => {
        if (response.status === 200) {
          console.log("response data table:");
          console.table(response.data);
          // If an error message is returned, display the error. Otherwise, continue with user info
          if (response.data.message) {
            alert(response.data.message);
          } else {
            // Udate App.js state
            dispatch(authLoginSuccess(response));
          }
        }
      })
      .catch(error => {
        console.log("login fail");
        console.log(error);
        dispatch(authLoginFail(error));
      });
  };
};
