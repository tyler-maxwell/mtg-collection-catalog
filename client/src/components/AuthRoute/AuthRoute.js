import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, path: url }) => {
  // Get JWT from local storage.
  const token = localStorage.getItem("token");

  return (
    <Route
      path={url}
      render={props => (token ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

export default AuthRoute;
