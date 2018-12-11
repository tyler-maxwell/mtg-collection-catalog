import React from "react";
import Button from "@material-ui/core/Button"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Row, Col} from "../../grid"

const AccountInfoDisplay = props => (
  <form>
    <Row>
      <Col size={12}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                {props.user.username}</TableCell>
                <TableCell>{props.user.firstName}</TableCell>
                <TableCell>{props.user.lastName}</TableCell>
                <TableCell>{props.user.email}</TableCell>
              </TableRow>
        </TableBody>
      </Table>
      </Col>
      <Col size={12}>
        <Button className="right" onClick={props.toggleEditMode}>
        Make Changes <i className="material-icons">edit</i>
        </Button>
      </Col>
    </Row>
  </form>
);

export default AccountInfoDisplay;
