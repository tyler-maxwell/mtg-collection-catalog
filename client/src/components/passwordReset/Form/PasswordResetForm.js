import React from "react";
import {Row, Col} from "../../grid"
//Material UI
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

const PasswordInfoForm = props => (
  <form>
    <Row>
      <Col size={12}>
    <TextField
      type="password"
      id="currentPassword"
      label="Current Password"
      name="current"
      placeholder="Password"
      value={props.password.current}
      onChange={props.handleInputChange}
    />
    </Col>
    <Col size={6}>
    <TextField
      type="password"
      id="newPassword"
      name="new"
      label="New Password"
      placeholder="New Password"
      value={props.password.new}
      onChange={props.handleInputChange}
    />
    </Col>
    <Col size={6}>
    <TextField
      label="Confirm"
      type="password"
      id="confirmPassword"
      name="confirm"
      placeholder="New Password"
      value={props.password.confirm}
      onChange={props.handleInputChange}
    />
    </Col>
    <Col size={12}>
    <Button type="submit" onClick={props.updatePassword}>
      Save Changes
    </Button>
    {/* <Button
      type="submit"
      onClick={event => {
        event.preventDefault();
        // props.loadPage("default");
      }}
    >
      Cancel
    </Button> */}
    </Col>
    </Row>
  </form>
);

export default PasswordInfoForm;
