// Token Authorization Actions

import UsersAPI from "../../../utils/usersAPI";
import * as actionTypes from "../../actionTypes/auth";

export const authTokenStart = () => {
  return {
    type: actionTypes.AUTH_TOKEN_START
  };
};

export const authTokenSuccess = user => {
  return {
    type: actionTypes.AUTH_TOKEN_SUCCESS,
    user: user
  };
};

export const authTokenFail = () => {
  return {
    type: actionTypes.AUTH_TOKEN_FAIL
  };
};

export const authToken = () => {
  return dispatch => {
    dispatch(authTokenStart());
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authTokenFail());
    } else {
      UsersAPI.getCurrentUser(token).then(response => {
        if (response.data.user) {
          dispatch(authTokenSuccess(response.data.user));
        } else {
          localStorage.removeItem("token");
          dispatch(authTokenFail());
        }
      });
    }
  };
};
