// React
import React from "react";
import ReactDOM from "react-dom";
// Redux
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk"; // for async actions
import authReducer from "./store/reducers/auth";
// App
import App from "./App";

// Combined Redux reducer
const rootReducer = combineReducers({
  auth: authReducer
});

// Logs Redux dispatches
const logger = store => {
  return next => {
    return action => {
      console.log("[Middleware] Dispatching", action);
      const result = next(action);
      console.log("[Middleware] next state", store.getState());
      return result;
    };
  };
};

// Enables store viewer when using of Redux DevTools https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Redux store
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

// Render
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
