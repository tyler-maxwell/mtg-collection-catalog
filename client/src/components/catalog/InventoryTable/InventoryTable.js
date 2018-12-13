// React
import React from "react";
// Material UI
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

const InventoryTable = props => {
  const { classes } = props;

  let id = 0;
  function createData(ownedCount, name, type, manaCost, power, toughness) {
    id += 1;
    return { id, ownedCount, name, type, manaCost, power, toughness };
  }

  const rows = [];

  props.inventory.cards.forEach(card =>
    rows.push(
      createData(
        card.ownedCount,
        card.name,
        card.info.type,
        card.info.manaCost,
        card.info.power,
        card.info.toughness
      )
    )
  );

  return (
    <React.Fragment>
      <Grid item xs={1}>
        <Typography variant="body1">
          Page: {props.inventory.page}/{props.inventory.totalPages}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <form onSubmit={props.onPageSubmit}>
          <input
            label="Page Select"
            type="number"
            name="pageSelect"
            min="1"
            max={props.inventory.totalPages}
            onChange={props.handleInputChange}
          />
        </form>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <IconButton
                  onClick={props.handleFirstPageButtonClick}
                  disabled={parseInt(props.inventory.page) === 1}
                  aria-label="First Page"
                >
                  <FirstPageIcon />
                </IconButton>
                <IconButton
                  onClick={props.handleBackButtonClick}
                  disabled={parseInt(props.inventory.page) === 1}
                  aria-label="Previous Page"
                >
                  <KeyboardArrowLeft />
                </IconButton>

                <IconButton
                  onClick={props.handleNextButtonClick}
                  disabled={
                    parseInt(props.inventory.page) ===
                    parseInt(props.inventory.totalPages)
                  }
                  aria-label="Next Page"
                >
                  <KeyboardArrowRight />
                </IconButton>

                <IconButton
                  onClick={props.handleLastPageButtonClick}
                  disabled={
                    parseInt(props.inventory.page) ===
                    parseInt(props.inventory.totalPages)
                  }
                  aria-label="Last Page"
                >
                  <LastPageIcon />
                </IconButton>
              </TableRow>
              <TableRow>
                <TableCell numeric>Owned</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Mana Cost</TableCell>
                <TableCell numeric>Power</TableCell>
                <TableCell numeric>Toughness</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell numeric component="th" scope="row">
                      {row.ownedCount}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.manaCost}</TableCell>
                    <TableCell numeric>{row.power}</TableCell>
                    <TableCell numeric>{row.toughness}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

InventoryTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InventoryTable);
