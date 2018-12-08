import React from "react";
import PasswordResetForm from "../Form";

const PasswordInfoCard = props => (
  <div className="col m4 offset-m4">
    <div className="card blue-grey darken-1">
      <div className="card-content white-text">
        <span className="card-title">Password Information</span>{" "}
        {props.submitMessage === "" ? (
          ""
        ) : (
          <span>
            <strong>{props.submitMessage}</strong>
          </span>
        )}
        <PasswordResetForm
          user={props.user}
          password={props.password}
          updatePassword={props.updatePassword}
          handleInputChange={props.handleInputChange}
          loadPage={props.loadPage}
        />
      </div>
    </div>
  </div>
);

export default PasswordInfoCard;
