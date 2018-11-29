// Authorization Reducers

import { updateObject } from "../utility";
import * as actionTypes from "../actionTypes/auth";

const initialState = {
  isLoggedIn: false,
  userInfo: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, {});
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {});
    case actionTypes.AUTH_FAIL:
      return updateObject(state, {});
    default:
      return state;
  }
};

export default authReducer;
