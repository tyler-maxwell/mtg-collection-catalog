import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import SimpleMenu from "../SimpleMenu";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

function SimpleAppBar(props) {
  const { classes, loadPage, isPublic } = props;
  console.log(loadPage);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search for a card..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
        </Toolbar>
        {isPublic === false ? <SimpleMenu loadPage={loadPage} /> : ""}
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);

// import React from "react";
// import { Link } from "react-router-dom";
// import Dropdown from "../../private/Dropdown";

// const Nav = props => (
//   <nav id="topNav">
//     {props.isPublic ? (
//       <div className="nav-wrapper">
//         <a className="brand-logo">Passport-JWT-MERN</a>
//         <ul id="nav-mobile" className="right hide-on-med-and-down">
//           <li>
//             <Link to="/">Login</Link>
//           </li>
//           <li>
//             <Link to="/dashboard">Dashboard</Link>
//           </li>
//         </ul>
//       </div>
//     ) : (
//       <div className="nav-wrapper">
//         <a href="/" className="brand-logo">
//           Logged in as <strong>{props.user.username}</strong>
//         </a>
//         <ul id="nav-mobile" className="right hide-on-med-and-down">
//           <li>
//             <Link to="/dashboard">Dashboard</Link>
//           </li>
//           <Dropdown
//             name={`${props.user.firstName} ${props.user.lastName}`}
//             handleLogout={props.handleLogout}
//           />
//         </ul>
//       </div>
//     )}
//   </nav>
// );

// export default Nav;
