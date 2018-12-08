import React from "react";

const PasswordInfoForm = props => (
  <form>
    <label htmlFor="current">Current Password:</label>
    <input
      type="password"
      id="currentPassword"
      name="current"
      placeholder="Password"
      value={props.password.current}
      onChange={props.handleInputChange}
    />
    <label htmlFor="new">New Password:</label>
    <input
      type="password"
      id="newPassword"
      name="new"
      placeholder="New Password"
      value={props.password.new}
      onChange={props.handleInputChange}
    />
    <label htmlFor="confirm">Confirm New Password:</label>
    <input
      type="password"
      id="confirmPassword"
      name="confirm"
      placeholder="New Password"
      value={props.password.confirm}
      onChange={props.handleInputChange}
    />
    <button type="submit" onClick={props.updatePassword}>
      Save Changes
    </button>
    <button
      type="submit"
      onClick={event => {
        event.preventDefault();
        props.loadPage("default");
      }}
    >
      Cancel
    </button>
  </form>
);

export default PasswordInfoForm;
