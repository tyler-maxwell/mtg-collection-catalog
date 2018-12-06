import React, { Component } from "react";
import {Row, Col, Container} from "../../../components/shared/grid"
import { Redirect, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Nav from "../../../components/shared/Nav";
import UsersAPI from "../../../utils/usersAPI";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import "./Login.css"

class Login extends Component {
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
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleLogin(event) {
    event.preventDefault();
    console.log("User Input Data:");
    console.table({
      Username: this.state.username,
      Password: this.state.password
    });

    UsersAPI.loginUser({
      username: this.state.username,
      password: this.state.password
    })
      .then(response => {
        document.getElementById("loginForm").reset();
        if (response.status === 200) {
          console.log("response data table:");
          console.table(response);
          // If an error message is returned, display the error. Otherwise, continue with user info
          if (response.data.message) {
            alert(response.data.message);
          } else {
            // Udate App.js state
            this.props.updateUser({
              loggedIn: true,
              user: {
                id: response.data.userInfo._id,
                username: response.data.userInfo.username,
                firstName: response.data.userInfo.firstName,
                lastName: response.data.userInfo.lastName,
                email: response.data.userInfo.email
              }
            });
            // Save the JSON Web Token to local storage
            localStorage.setItem("token", response.data.token);
            // update the state to redirect to private view
            this.setState({
              redirectTo: "/dashboard"
            });
          }
        }
      })
      .catch(error => {
        console.log(error);
        alert("Login failed");
      });
  }

  render() {
    const { classes } = this.props;

    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <Container>
          <Nav isPublic={true} />
          <Row>
            <Col size={4} />
            <Col size={4}>
              <div className="signIn">
                <h4 className="header">Login</h4>
                <form id="loginForm">
                <Row>
                  <Col size={6} mSize={12}>
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
                  <Col size={6} mSize={12}>
                  <TextField
                    required
                    id="password"
                    label="Password"
                    name="password"
                    className="textField"
                    type="password"
                    autoComplete="current-password"
                    onChange={this.handleChange}
                    margin="normal"
                    variant="filled"
                  />
                  </Col>
                </Row>
                  <Button
                    className="btn"
                    id="btn1"
                    onClick={this.handleLogin}
                    type="submit"
                    variant="contained" 
                    disabled={this.state.username && this.state.password ? false : true} 
                    size="large" 
                    color="primary"
                  >
                    Login
                  </Button>
                </form>
                <p>
                  Don't have an account?{" "}
                  <div />
                  <Button
                    className="btn"
                    id="btn1"
                    type="submit"
                    variant="contained" 
                    size="large"
                    href="/signup"
                    color="primary" 
                  >Click Here to Sign Up!</Button>
                 
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default Login;
