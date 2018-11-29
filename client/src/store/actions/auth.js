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

export const auth = (firstName, lastName, email, username, password) => {
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
        console.log(res);
        dispatch(authSuccess(res));
        // if (!response.data.error) {
        //   alert(`Successful signup for new user: ${response.data.username}.`);
        //   this.setState({
        //     firstName: "",
        //     lastName: "",
        //     email: "",
        //     username: "",
        //     password: "",
        //     redirectTo: "/"
        //   });
        // } else {
        //   alert(response.data.error);
        //   this.setState({
        //     firstName: "",
        //     lastName: "",
        //     email: "",
        //     username: "",
        //     password: ""
        //   });
        // }
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error));
      });
  };
};
