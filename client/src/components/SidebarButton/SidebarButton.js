// React
import React from "react";
import { Route } from "react-router-dom";
// Material UI
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";

const SidebarButton = props => (
  <Route
    render={({ history }) => (
      <ListItem
        button
        key={props.text}
        onClick={() => {
          history.push(`/authorized/${props.path}`);
        }}
      >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItem>
    )}
  />
);

export default SidebarButton;
