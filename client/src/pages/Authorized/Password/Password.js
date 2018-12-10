// React Imports
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// grid Imports
import Row from "../../../components/grid/Row";
// Component Imports
import PasswordResetCard from "../../../components/passwordReset/Card";
//API Imports
import UsersAPI from "../../../utils/usersAPI";

class Password extends Component {
  constructor() {
    super();
    this.state = {
      password: {
        current: "",
        new: "",
        confirm: ""
      },
      submitMessage: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  updatePassword = event => {
    event.preventDefault();
    console.log("Password data:");
    console.table(this.state.password);
    if (
      window.confirm(
        "Are you sure you want to update your account information?"
      )
    ) {
      if (this.state.password.current.trim() === "") {
        this.setState({
          ...this.state,
          submitMessage: "Please enter your current password."
        });
      } else if (this.state.password.new.trim() === "") {
        this.setState({
          ...this.state,
          submitMessage: "Please enter your new password."
        });
      } else if (this.state.password.confirm.trim() === "") {
        this.setState({
          ...this.state,
          submitMessage: "Please confirm your new password."
        });
      } else if (
        this.state.password.new.trim() != this.state.password.confirm.trim()
      ) {
        alert(
          "There was a mistake confirming your password. Please retype your new password and confirm."
        );
      } else {
        // Get JWT from local storage.
        const token = localStorage.getItem("token");
        const id = this.props.user.id;
        const passData = this.state.password;
        console.log("passData", passData);
        // PUT request to update the password. Passing in JWT to confirm validity prior to executing DB query.
        UsersAPI.updatePassword(id, token, passData).then(res => {
          if (!res.data.error) {
            alert(`Password successfully updated!`);
            window.location.reload();
          } else {
            alert(res.data.error);
          }
        });
      }
    }
  };

  handleInputChange(event) {
    this.setState({
      password: {
        ...this.state.password,
        [event.target.name]: event.target.value
      }
    });
  }

  render() {
    return (
      <div>
        <Row>
          <PasswordResetCard
            user={this.props.user}
            password={this.state.password}
            submitMessage={this.state.submitMessage}
            updatePassword={this.updatePassword}
            handleInputChange={this.handleInputChange}
          />
        </Row>
      </div>
    );
  }
}

export default withRouter(Password);
