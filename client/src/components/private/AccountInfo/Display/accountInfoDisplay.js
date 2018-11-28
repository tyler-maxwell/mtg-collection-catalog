import React from "react";
import Col from "../../../shared/Grid/Col";
import "./AccountInfoDisplay.css";

const AccountInfoDisplay = props => (
  <form>
    <label htmlFor="username">Username:</label>
    <p id="username">{props.user.username}</p>
    <label htmlFor="firstName">First Name:</label>
    <p id="firstName">{props.user.firstName}</p>
    <label htmlFor="lastName">Last Name:</label>
    <p id="lastName">{props.user.lastName}</p>
    <label htmlFor="email">Email:</label>
    <p id="email">{props.user.email}</p>
  </form>
);

export default AccountInfoDisplay;
