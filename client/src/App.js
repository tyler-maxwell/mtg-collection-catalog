// React
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import * as actions from './store/actions';
// Pages
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Authorized from './pages/Authorized';
import Search from './pages/Search';
// Auth Route
import AuthRoute from './components/AuthRoute';
//API
import CardSearchAPI from './utils/cardInfoAPI';
// CSS
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: ''
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.props.checkToken();
  }

  onSearch = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state.searchTerm);
  };

  handleSearch = event => {
    event.preventDefault();
    if (this.state.searchTerm) {
      CardSearchAPI.searchCardName(this.state.searchTerm)
        .then(res => {
          let filteredCardNames = Array.from(new Set(res.data));
          console.log(filteredCardNames);
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Login
                  {...props}
                  onSearch={this.onSearch}
                  handleSearch={this.handleSearch}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={props => <SignUp {...props} />}
            />
            <AuthRoute
              path="/authorized"
              component={Authorized}
              onSearch={this.onSearch}
            />
            <Route
              exact-path="/search"
              render={props => <Search {...props} />}
            />
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
