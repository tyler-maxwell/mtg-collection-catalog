// Authorization Reducers

import { updateObject } from "../utility";
import * as actionTypes from "../actionTypes/auth";

const initialState = {
  isLoggedIn: false,
  userInfo: null
};

const loginUser = (state, authData) => {
  console.log("authData", authData);
  const updatedValues = {
    isLoggedIn: true,
    userInfo: {
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

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, {});
    case actionTypes.AUTH_SUCCESS:
      return loginUser(state, action.authData);
    case actionTypes.AUTH_FAIL:
      return updateObject(state, {});
    default:
      return state;
  }
};

export default authReducer;
