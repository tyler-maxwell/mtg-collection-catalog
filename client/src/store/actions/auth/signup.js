// Signup Authorization Actions

import UsersAPI from "../../../utils/usersAPI";
import * as actionTypes from "../../actionTypes/auth";

export const authSignupStart = () => {
  return {
    type: actionTypes.AUTH_SIGNUP_START
  };
};

export const authSignupSuccess = res => {
  return {
    type: actionTypes.AUTH_SIGNUP_SUCCESS,
    authData: res.data
  };
};

export const authSignupFail = error => {
  return {
    type: actionTypes.AUTH_SIGNUP_FAIL,
    error: error
  };
};

export const authSignup = (firstName, lastName, email, username, password) => {
  return dispatch => {
    dispatch(authSignupStart());
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
        // If an error message is returned, display the error. Otherwise, continue with user info
        if (res.data.error) {
          dispatch(authSignupFail(res.data.error));
        }
        UsersAPI.loginUser({
          username: res.data.username,
          password: password
        })
          .then(response => {
            if (response.status === 200) {
              console.log("response data table:");
              console.table(response.data);

              if (response.data.message) {
                alert(response.data.message);
              } else {
                // Udate App.js state
                dispatch(authSignupSuccess(response));
              }
            }
          })
          .catch(error => {
            console.log("login fail");
            console.log(error);
            // dispatch(authSignupFail(error));
          });
      })
      .catch(error => {
        console.log("signup fail");
        console.log(error);
        // dispatch(authSignupFail(error));
      });
  };
};
