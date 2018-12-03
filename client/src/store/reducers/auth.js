// Authorization Reducers

import { updateObject } from "../utility";
import * as actionTypes from "../actionTypes/auth";

const initialState = {
  isLoggedIn: false,
  user: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SIGNUP_START:
      return updateObject(state, {});
    case actionTypes.AUTH_SIGNUP_SUCCESS:
      return loginUser(state, action.authData);
    case actionTypes.AUTH_SIGNUP_FAIL:
      return updateObject(state, {});
    // case actionTypes.AUTH_LOGOUT:
    //   return logoutUser(state);
    default:
      return state;
  }
};

const loginUser = (state, authData) => {
  console.log("authData", authData);
  const updatedValues = {
    isLoggedIn: true,
    user: {
      id: authData.user._id,
      username: authData.user.username,
      firstName: authData.user.firstName,
      lastName: authData.user.lastName,
      email: authData.user.email
    }
  };
  localStorage.setItem("token", authData.token);
  return updateObject(state, updatedValues);
};

const logoutUser = state => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  // UsersAPI.logoutUser({ user: this.state.username })
  //     .then(response => {
  //       if (response.status === 200) {
  //         this.updateUser({
  //           loggedIn: false,
  //           user: null
  //         });
  //       }
  //     })
  //     .catch(error => {
  //       console.log("Logout error", error);
  //     });
  return updateObject(state, { isLoggedIn: false, user: null });
};

export default authReducer;
