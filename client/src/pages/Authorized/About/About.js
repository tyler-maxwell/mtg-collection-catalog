// React
import React from "react";
// Redux
import { connect } from "react-redux";

const About = props => (
  <React.Fragment>
    <h3>Hello, {props.user.firstName}!</h3>
    <h3>This is the primary authorized page.</h3>
    <p>
      Using components embedded in this page you will be able to edit your user
      account information and manage your personal card collection.
    </p>
    <p>
      The only other part of this application that will require a login will be
      a subsection of the card search page where you can add cards to your
      collection directly from the card search. This feature is not planned for
      MVP release however.
    </p>
  </React.Fragment>
);

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(About);
