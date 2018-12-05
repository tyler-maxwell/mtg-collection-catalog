// Authorization Reducers

import { updateObject } from "../utility";
import * as actionTypes from "../actionTypes/auth";

const initialState = {
  isLoggedIn: false,
  user: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Signup
    case actionTypes.AUTH_SIGNUP_START:
      return updateObject(state, {});
    case actionTypes.AUTH_SIGNUP_SUCCESS:
      return loginUser(state, action.authData);
    case actionTypes.AUTH_SIGNUP_FAIL:
      return updateObject(state, { signupError: action.error });
    // Login
    case actionTypes.AUTH_LOGIN_START:
      return updateObject(state, {});
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return loginUser(state, action.authData);
    case actionTypes.AUTH_LOGIN_FAIL:
      return updateObject(state, {});
    // Logout
    case actionTypes.AUTH_LOGOUT_START:
      return updateObject(state, {});
    case actionTypes.AUTH_LOGOUT_SUCCESS:
      return logoutUser(state, action.status);
    case actionTypes.AUTH_LOGOUT_FAIL:
      return updateObject(state, {});
    // Token
    case actionTypes.AUTH_TOKEN_START:
      return updateObject(state, {});
    case actionTypes.AUTH_TOKEN_SUCCESS:
      return loginUserFromToken(state, action.user);
    case actionTypes.AUTH_TOKEN_FAIL:
      return updateObject(state, {});
    // Default
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

const loginUserFromToken = (state, user) => {
  console.log("userFromToken", user);
  const updatedValues = {
    isLoggedIn: true,
    user: {
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
  };
  return updateObject(state, updatedValues);
};

const logoutUser = (state, status) => {
  if (status === 200) {
    return updateObject(state, { isLoggedIn: false, user: null });
  } else {
    // handle error
    return updateObject(state, {});
  }
};

export default authReducer;
