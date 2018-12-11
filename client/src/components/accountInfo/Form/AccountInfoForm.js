import React from "react";
import {Row, Col} from "../../grid";
//Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button"

const AccountInfoForm = props => (
  <form>
    <Row>
      <Col size={12}>
        <TextField
          type="text"
          label="Username"
          id="username"
          name="username"
          placeholder={props.user.username}
          value={props.modUser.username ? props.modUser.username : props.user.username}
          onChange={props.handleInputChange}
        />
      </Col>
      <Row>
        <Col size={6}>
          <TextField
            label="First Name"
            type="text"
            id="firstName"
            name="firstName"
            placeholder={props.user.firstName}
            value={props.modUser.firstName ? props.modUser.firstName : props.user.firstName}
            onChange={props.handleInputChange}
          />
        </Col>
        <Col size={6}>
          <TextField
            label="Last Name"
            type="text"
            id="lastName"
            name="lastName"
            placeholder={props.user.lastName}
            value={props.modUser.lastName ? props.modUser.lastName : props.user.lastName}
            onChange={props.handleInputChange}
          />
        </Col>
      </Row>
        <TextField
          type="text"
          label="Email"
          id="email"
          name="email"
          placeholder={props.user.email}
          value={props.modUser.email ? props.modUser.email : props.user.email}
          onChange={props.handleInputChange}
        />
      <Row>
        <Col size={12}>
        <Button type="submit" onClick={props.submitUpdate}>
        Save Changes
      </Button>
      <Button type="submit" onClick={props.toggleEditMode}>
        Cancel
      </Button>
        </Col>
      </Row>

    </Row>
  </form>
);

export default AccountInfoForm;
