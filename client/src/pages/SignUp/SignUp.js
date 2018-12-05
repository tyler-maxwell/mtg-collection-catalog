// React
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import * as actions from "../../store/actions";
// Components
import Row from "../../components/grid/Row";
import Col from "../../components/grid/Col";
import Nav from "../../components/Nav";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: ""
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSignUp(event) {
    event.preventDefault();
    this.props.authSignup(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.username,
      this.state.password
    );
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/authorized" />;
    } else {
      return (
        <div className="Container">
          <Nav isPublic={true} />
          <Row>
            <Col size={4} />
            <Col size={4}>
              <div className="signIn">
                <h4>Sign Up</h4>
                {this.props.signupError ? (
                  <span>{this.props.signupError}</span>
                ) : (
                  ""
                )}
                <form id="loginForm">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name (required)"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name (required)"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email (optional)"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username (required)"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="password">Password:</label>
                  <input
                    placeholder="Password (required)"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <button
                    id="btn2"
                    disabled={!(this.state.username && this.state.password)}
                    onClick={this.handleSignUp}
                    type="submit"
                  >
                    Sign up
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    signupError: state.auth.signupError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authSignup: (firstName, lastName, email, username, password) =>
      dispatch(
        actions.authSignup(firstName, lastName, email, username, password)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
