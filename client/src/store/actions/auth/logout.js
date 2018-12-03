// Logout Authorization Actions

import UsersAPI from "../../../utils/usersAPI";
import * as actionTypes from "../../actionTypes/auth";

export const authLogoutStart = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_START
  };
};

export const authLogoutSuccess = res => {
  return {
    type: actionTypes.AUTH_LOGOUT_SUCCESS,
    status: res.status
  };
};

export const authLogoutFail = error => {
  return {
    type: actionTypes.AUTH_LOGOUT_FAIL,
    error: error
  };
};

export const authLogout = username => {
  return dispatch => {
    dispatch(authLogoutStart());
    // Remove JWTs from local storage.
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    UsersAPI.logoutUser({ user: username })
      .then(response => {
        dispatch(authLogoutSuccess(response.status));
      })
      .catch(error => {
        dispatch(authLogoutFail(error));
      });
  };
};
