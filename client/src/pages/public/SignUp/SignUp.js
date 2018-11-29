// React
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
// Components
import Row from "../../../components/shared/grid/Row";
import Col from "../../../components/shared/grid/Col";
import { Redirect } from "react-router-dom";
import Nav from "../../../components/shared/Nav";
// API
import UsersAPI from "../../../utils/usersAPI";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      redirectTo: null
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
    console.log("State:", this.state);
  }

  handleSignUp(event) {
    event.preventDefault();
    this.props.onAuth(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.username,
      this.state.password
    );
    // const user = {
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName,
    //   email: this.state.email,
    //   username: this.state.username,
    //   password: this.state.password
    // };
    // console.log("Signing up user", user);
    // UsersAPI.signupUser(user)
    //   .then(response => {
    //     if (!response.data.error) {
    //       alert(`Successful signup for new user: ${response.data.username}.`);
    //       this.setState({
    //         firstName: "",
    //         lastName: "",
    //         email: "",
    //         username: "",
    //         password: "",
    //         redirectTo: "/"
    //       });
    //     } else {
    //       alert(response.data.error);
    //       this.setState({
    //         firstName: "",
    //         lastName: "",
    //         email: "",
    //         username: "",
    //         password: ""
    //       });
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="Container">
          <Nav isPublic={true} />
          <Row>
            <Col size="4" />
            <Col size="4">
              <div className="signIn">
                <h4>Sign Up</h4>
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

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (firstName, lastName, email, username, password) =>
      dispatch(
        actions.authSignup(firstName, lastName, email, username, password)
      )
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignUp);