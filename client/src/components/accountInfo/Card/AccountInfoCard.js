import React from "react";
import AccountInfoDisplay from "../Display";
import AccountInfoForm from "../Form";
import {Row, Col} from "../../grid";

const AccountInfoCard = props => (
  <Row>
  <Col size={2}> 
  <span className="card-title">Account Information</span>
  </Col>
  <Col size={9}>
  
        {!props.editMode ? (
          <AccountInfoDisplay
            editMode={props.editMode}
            user={props.user}
            toggleEditMode={props.toggleEditMode}
          />
        ) : (
          <AccountInfoForm
            user={props.user}
            editMode={props.editMode}
            modUser={props.modUser}
            submitUpdate={props.submitUpdate}
            handleInputChange={props.handleInputChange}
            toggleEditMode={props.toggleEditMode}
          />
        )}
  </Col>
  </Row>
);

export default AccountInfoCard;
