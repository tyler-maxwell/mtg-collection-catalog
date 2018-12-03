// React
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
// Redux
import { connect } from "react-redux";
import * as actions from "./store/actions";
// Pages
import Login from "./pages/public/Login";
import SignUp from "./pages/public/SignUp";
import PrivateMaster from "./pages/private/PrivateMaster";
import Account from "./pages/private/Account";
import Password from "./pages/private/Password";
// Auth Route
import AuthRoute from "./components/Auth";
// CSS
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // loggedIn: false,
      // // Current user data
      // user: {
      //   id: "",
      //   username: "",
      //   firstName: "",
      //   lastName: "",
      //   email: ""
      // }
    };

    // this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    // this.updateUser = this.updateUser.bind(this);
    // this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
  }

  // getUser() {
  //   // Get JWT from local storage.
  //   const token = localStorage.getItem("token");
  //   console.log("getUser, token:", token);
  //   // Pass token to secured route
  //   UsersAPI.getCurrentUser(token).then(response => {
  //     if (response.data.user) {
  //       console.table(response.data.user);
  //       this.setState({
  //         loggedIn: true,
  //         user: {
  //           id: response.data.user._id,
  //           username: response.data.user.username,
  //           firstName: response.data.user.firstName,
  //           lastName: response.data.user.lastName,
  //           email: response.data.user.email
  //         }
  //       });
  //     } else {
  //       console.log("There is no user: ", response.data);
  //       this.handleLogout();
  //       this.setState({
  //         user: null
  //       });
  //     }
  //   });
  // }

  // updateUser(userObject) {
  //   this.setState(userObject);
  // }

  // handleLogout(event) {
  //   // event.preventDefault();
  //   // Remove JWTs from local storage.
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("refreshToken");
  // UsersAPI.logoutUser({ user: this.state.username })
  //   .then(response => {
  //     if (response.status === 200) {
  //       this.updateUser({
  //         loggedIn: false,
  //         user: null
  //       });
  //     }
  //   })
  //   .catch(error => {
  //     console.log("Logout error", error);
  //   });
  // }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Login updateUser={this.updateUser} {...props} />
              )}
            />
            <Route
              exact
              path="/signup"
              render={props => (
                <SignUp updateUser={this.updateUser} {...props} />
              )}
            />
            <AuthRoute
              path="/dashboard"
              component={PrivateMaster}
              loggedIn={this.state.loggedIn}
              handleLogout={this.handleLogout}
              getUser={this.getUser}
              user={this.state.user}
            />
            <AuthRoute
              path="/account"
              component={Account}
              user={this.state.user}
              handleLogout={this.handleLogout}
            />
            <AuthRoute
              path="/password"
              component={Password}
              user={this.state.user}
              handleLogout={this.handleLogout}
            />
            <Route render={() => <Redirect to="/dashboard" />} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     isLoggedIn: state.isLoggedIn,
//     userInfo: state.userInfo
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(actions.authToken())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
