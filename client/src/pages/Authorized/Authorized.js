// React
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
// Components
import Nav from "../../../components/shared/Nav";

class Authorized extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Nav isPublic={true} />
        <h3>Hello, {this.props.userInfo.firstName}!</h3>
        <h3>This is the primary authorized page.</h3>
        <p>
          Using components embedded in this page you will be able to edit your
          user account information and manage your personal card collection.
        </p>
        <p>
          The only other part of this application that will require a login will
          be a subsection of the card search page where you can add cards to
          your collection directly from the card search. This feature is not
          planned for MVP release however.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    userInfo: state.userInfo
  };
};

export default connect(mapStateToProps)(withRouter(Authorized));
