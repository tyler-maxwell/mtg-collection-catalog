import React from "react";
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
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
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
          <MenuItem
            onClick={event => {
              event.preventDefault();
              this.handleClose();
              this.props.loadPage("default");
            }}
          >
            Default
          </MenuItem>
          <MenuItem
            onClick={event => {
              event.preventDefault();
              this.handleClose();
              this.props.loadPage("account");
            }}
          >
            My Account
          </MenuItem>
          <MenuItem
            onClick={event => {
              event.preventDefault();
              this.handleClose();
              this.props.loadPage("password");
            }}
          >
            Reset Password
          </MenuItem>
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
