// React
import React from "react";
// Redux
import { connect } from "react-redux";

const About = props => (
  <React.Fragment>
    <h3>Hello, {props.user.firstName}!</h3>
    <h3>This is the about page.</h3>
  </React.Fragment>
);

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(About);
