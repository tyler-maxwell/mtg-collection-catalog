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
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Authorized from "./pages/Authorized";
// Auth Route
import AuthRoute from "./components/AuthRoute";
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
            <AuthRoute path="/authorized" component={Authorized} />
            {/* <Route render={() => <Redirect to="/authorized" />} /> */}
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
