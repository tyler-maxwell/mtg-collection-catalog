// React
import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import * as actions from "../../store/actions";
// Components
import Nav from "../../components/Nav";

class Authorized extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: "default"
    };
  }

  loadPage = page => {
    switch (page) {
      case "default":
        this.setState({
          currentPage: "default"
        });
        break;
      case "account":
        this.setState({
          currentPage: "account"
        });
        break;
      case "password":
        this.setState({
          currentPage: "password"
        });
        break;
    }
  };

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <Nav isPublic={false} loadPage={this.loadPage} />
          {this.state.currentPage === "default" ? (
            <div>
              <h3>Hello, {this.props.user.firstName}!</h3>
              <h3>This is the primary authorized page.</h3>
              <p>
                Using components embedded in this page you will be able to edit
                your user account information and manage your personal card
                collection.
              </p>
              <p>
                The only other part of this application that will require a
                login will be a subsection of the card search page where you can
                add cards to your collection directly from the card search. This
                feature is not planned for MVP release however.
              </p>
            </div>
          ) : this.state.currentPage === "account" ? (
            <p>This is the account info page.</p>
          ) : this.state.currentPage === "password" ? (
            <p>This is the password reset page.</p>
          ) : (
            "404"
          )}
          <button
            id="logoutBtn"
            onClick={() => this.props.authLogout(this.props.user.username)}
            type="submit"
          >
            Logout
          </button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authLogout: username => dispatch(actions.authLogout(username))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Authorized));
