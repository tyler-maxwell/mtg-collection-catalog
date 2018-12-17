// React
import React from "react";
import { Row, Col } from "../grid";
// Material UI
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// Components
import CardImage from "../CardImage";
import ManaCost from "../ManaCost";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

function CardInfo(props) {
  const { classes } = props;

  console.log(props);

  return (
    <Grid item xs={12}>
      <Row>
        <Grid item xs={2} />
        <Grid item xs={3}>
          <CardImage multiverseId={props.multiverseId} />
        </Grid>
        <Grid item xs={5}>
          <Paper>
            <Grid item xs={12}>
              <Typography variant="h6">
                {props.name} — {props.manaCost}
                <ManaCost manaCost={props.manaCost} />
              </Typography>
              <Divider />
              <Typography variant="h6">{props.type}</Typography>
              <Divider />
              <Typography variant="p">{props.text}</Typography>
              <Divider />
              <Typography variant="p">
                <i>{props.flavorText}</i>
              </Typography>
              <Divider />
              {props.power ? (
                <p>
                  {props.power}/{props.toughness}
                </p>
              ) : null}
              {props.power && <Divider />}
              {props.rulings.length > 0 && (
                <Typography variant="h6">Rulings</Typography>
              )}
              {props.rulings.length > 0 &&
                props.rulings.map(ruling => (
                  <React.Fragment>
                    <Typography variant="">{ruling.date}</Typography>
                    <Typography variant="p">{ruling.text}</Typography>
                    <Divider />
                  </React.Fragment>
                ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Paper />
        </Grid>
      </Row>
    </Grid>
  );
}

CardInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardInfo);
