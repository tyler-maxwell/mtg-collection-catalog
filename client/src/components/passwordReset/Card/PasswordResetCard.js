import React from "react";
import PasswordResetForm from "../Form";
// MaaterialUI
import {Row, Col} from "../../grid"

const PasswordInfoCard = props => (
  <Row>
    <Col size={2}>
        <span className="card-title">Password Information</span>{" "}
        {props.submitMessage === "" ? (
          ""
        ) : (
          <span>
            <strong>{props.submitMessage}</strong>
          </span>
        )}
    </Col>
    <Col size={9}>
        <PasswordResetForm
          user={props.user}
          password={props.password}
          updatePassword={props.updatePassword}
          handleInputChange={props.handleInputChange}
        />
    </Col>
  </Row>
);

export default PasswordInfoCard;
