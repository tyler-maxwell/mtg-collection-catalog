// React
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
// Redux
import { connect } from "react-redux";
import * as actions from "../../store/actions";
// Material UI
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Typography from "@material-ui/core/Typography";
// Components
import Nav from "../../components/Nav";
// Sub-pages
import About from "./About";
import Inventory from "./Inventory";
import MyAccount from "../MyAccount";
import Password from "../Password";

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: 240,
    flexShrink: 0
  },
  drawerPaper: {
    width: 240
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

const Authorized = props => {
  const { classes } = props;

  if (!props.isLoggedIn) {
    return "Waiting for data to load from Redux";
  } else {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Nav
          isPublic={false}
          username={props.user.username}
          logOut={() => props.authLogout(props.user.username)}
        />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem button key="Inventory">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inventory" />
            </ListItem>
            <ListItem button key="Wishlist">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Wishlist" />
            </ListItem>
          </List>
          <Divider />
          <List>
            {["Deck 1", "Deck 2", "Deck 3"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button key="About">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
          </List>
        </Drawer>
        {/* {this.state.currentPage === "default" ? ( */}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route
              exact
              path="/authorized/about"
              render={props => <About {...props} />}
            />
            <Route
              exact
              path="/authorized/inventory"
              render={props => <Inventory {...props} />}
            />
            <Route render={() => <Redirect to="/authorized/about" />} />
          </Switch>
        </main>
        {/* // ) : this.state.currentPage === "account" ? (
          //   <MyAccount user={props.user} />
          // ) : this.state.currentPage === "password" ? (
          //   <Password user={props.user} />
          // ) : (
          //   "404"
          // )} */}
      </div>
    );
  }
};

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

Authorized.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Authorized)));
