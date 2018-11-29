import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {};
    case actionTypes.AUTH_SUCCESS:
      return {};
    case actionTypes.AUTH_FAIL:
      return {};
    default:
      return state;
  }
};

export default authReducer;
