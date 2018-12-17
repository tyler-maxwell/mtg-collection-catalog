import React from "react";
import {Row, Col} from "../grid";
import Paper from "@material-ui/core/Paper"
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit *2
  },
});


function CardInfo(props) {
const { classes } = props;

return(
    <Col size={4}>
    <Paper>
        <Row>
        <Col size={4}>
            Image Here
        </Col>
        <Col size={8}>
            <Row>
                <Col size={12}>
                <Typography variant="h6">
                {props.name} — {props.manaCost}
                </Typography>
                <Divider />
                <Typography variant="h6">
                {props.type}
                </Typography>
                <Divider />
                <Typography variant="p">
                    {props.text}
                </Typography>
                <Divider />
                <Typography variant="p">
                    <i>{props.flavorText}</i>
                </Typography>
                <Divider />
                </Col>
                {props.power ?                
                    
                <Row>
                    <Col size={8} />
                    <Col size={4}>
                    {props.power}/{props.toughness}
                    </Col>
                </Row> 
                : null}

            </Row>
        </Col>
        </Row>
    </Paper>
    </Col>
);

};

CardInfo.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(CardInfo);
