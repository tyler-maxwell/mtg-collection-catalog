// React
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import * as actions from "../../store/actions";
// Components
import {Row, Col} from "../../../components/shared/grid";
import { Redirect } from "react-router-dom";
import Nav from "../../../components/shared/Nav";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
                <Row>
                  <Col size={6}>
                    <TextField
                      required
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      className="textField"
                      onChange={this.handleChange}
                      margin="normal"
                      variant="filled"
                    />
                  </Col>
                  <Col size={6}>
                    <TextField
                      required
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      className="textField"
                      onChange={this.handleChange}
                      margin="normal"
                      variant="filled"
                    />
                  </Col>
                </Row>
                  
                <Row>
                    <Col size={6}>
                      <TextField
                        required
                        id="username"
                        label="Username"
                        name="username"
                        className="textField"
                        onChange={this.handleChange}
                        margin="normal"
                        variant="filled"
                      />
                    </Col>
                    <Col size={6}>
                      <TextField
                        required
                        id="password"
                        label="Password"
                        name="password"
                        className="textField"
                        onChange={this.handleChange}
                        margin="normal"
                        variant="filled"
                      />
                    </Col>
                </Row>
                <Row>
                  <Col size={12}></Col>
                  <TextField
                    id="email"
                    label="Email(Optional)"
                    name="email"
                    className="textField"
                    onChange={this.handleChange}
                    margin="normal"
                    variant="filled"
                  />
                </Row>
                  <Button
                    id="btn2"
                    disabled={!(this.state.username && this.state.password && this.state.firstName && this.state.lastName)}
                    onClick={this.handleSignUp}
                    type="submit"
                  >
                    Sign up
                  </Button>
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
