// React
import React from "react";
import { Route } from "react-router-dom";
// Material UI
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
    console.log(this.props);
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <i className="material-icons">person</i> {this.props.username}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              // item height * 4.5 based on material ui example
              maxHeight: 48 * 4.5,
              width: 200
            }
          }}
        >
          <Route
            render={({ history }) => (
              <MenuItem
                onClick={event => {
                  event.preventDefault();
                  this.handleClose();
                  history.push(`/authorized/account`);
                }}
              >
                My Account
              </MenuItem>
            )}
          />
          <Route
            render={({ history }) => (
              <MenuItem
                onClick={event => {
                  event.preventDefault();
                  this.handleClose();
                  history.push(`/authorized/reset`);
                  // this.props.loadPage("password");
                }}
              >
                Reset Password
              </MenuItem>
            )}
          />
          <MenuItem
            onClick={event => {
              event.preventDefault();
              this.handleClose();
              this.props.logOut();
            }}
          >
            Log Out
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
