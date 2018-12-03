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
    this.state = {};
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.props.checkToken();
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" render={props => <Login {...props} />} />
            <Route
              exact
              path="/signup"
              render={props => <SignUp {...props} />}
            />
            <AuthRoute path="/dashboard" component={PrivateMaster} />
            <AuthRoute path="/account" component={Account} />
            <AuthRoute path="/password" component={Password} />
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
    checkToken: () => dispatch(actions.authToken())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
