// Authorization Actions

import UsersAPI from "../../utils/usersAPI";
import * as actionTypes from "../actionTypes/auth";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = res => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: res.data
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const authSignup = (firstName, lastName, email, username, password) => {
  return dispatch => {
    dispatch(authStart());
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password
    };
    console.log("Signing up user", user);
    UsersAPI.signupUser(user)
      .then(res => {
        console.log(res.data);
        UsersAPI.loginUser({
          username: res.data.username,
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
                dispatch(authSuccess(response));
              }
            }
          })
          .catch(error => {
            console.log("login fail");
            console.log(error);
            dispatch(authFail(error));
          });
      })
      .catch(error => {
        console.log("signup fail");
        console.log(error);
        dispatch(authFail(error));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    } else {
      UsersAPI.getCurrentUser(token).then(response => {
        if (response.data.user) {
          console.table(response.data.user);
          dispatch(authSuccess(response));
        } else {
          console.log("There is no user: ", response.data);
        }
      });
    }
  };
};
