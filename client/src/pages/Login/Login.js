// React
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper"
// Components
import { Row, Col, Container } from "../../components/grid";
import Nav from "../../components/Nav";
import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      search: ''
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
    this.props.authLogin(this.state.username, this.state.password);
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/authorized" />;
    } else {
      return (
        <Container>
          <Nav
            isPublic={true}
            onSearch={this.props.onSearch}
            handleSearch={this.props.handleSearch}
          />
          <Row>
            <Col size={4} />
            <Col size={4}>
            <Paper>
              <div className="signIn">
                <h4 className="header">Login</h4>
                {this.props.loginError ? (
                  <span>{this.props.loginError}</span>
                ) : (
                  ''
                )}
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
                    disabled={
                      this.state.username && this.state.password ? false : true
                    } 
                    size="large" 
                    color="primary"
                  >
                    Login
                  </Button>
                </form>
                <p>
                  Don't have an account?
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
              </Paper>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    loginError: state.auth.loginError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authLogin: (username, password) =>
      dispatch(actions.authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
