// React
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
// Material UI
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
// Components
import BatchForm from "../../../components/catalog/BatchForm";
import InventoryTable from "../../../components/catalog/InventoryTable";
// API
import inventoryAPI from "../../../utils/inventoryAPI";

class Inventory extends Component {
  state = {
    batchText: "",
    inventory: {
      hasInventory: false
    }
  };

  componentDidMount() {
    this.loadCards(1);
  }

  loadCards = page => {
    console.log("loadCards called");
    inventoryAPI.getCardsByPage(this.props.user.id, page).then(res => {
      console.log("res", res);
      this.setState({
        inventory: res.data
      });
    });
  };

  handleFirstPageButtonClick = event => {
    const page = 1;
    this.setState({
      inventory: {
        hasInventory: false
      }
    });
    this.loadCards(page);
  };

  handleBackButtonClick = event => {
    const page = parseInt(this.state.inventory.page) - 1;
    this.setState({
      inventory: {
        hasInventory: false
      }
    });
    this.loadCards(page);
  };

  handleNextButtonClick = event => {
    const page = parseInt(this.state.inventory.page) + 1;
    this.setState({
      inventory: {
        hasInventory: false
      }
    });
    this.loadCards(page);
  };

  handleLastPageButtonClick = event => {
    const page = parseInt(this.state.inventory.totalPages);
    this.setState({
      inventory: {
        hasInventory: false
      }
    });
    this.loadCards(page);
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const preparedBatch = this.prepareBatch(this.state.batchText);
    inventoryAPI
      .submitBatch(this.props.user.id, preparedBatch.batch)
      .then(res => {
        console.log(res);
      });
  };

  prepareBatch = batchText => {
    // Returned object
    const res = {
      batch: {
        cards: []
      },
      badLines: []
    };
    // Array of lines from textarea
    var lines = batchText.trim().split("\n");
    // Format good lines and identify bad lines
    lines.forEach(function(line) {
      var cardName = "";
      var amount = "";
      for (var i = 0; i < line.length; i++) {
        // Check if character at [i] is a number and grab cardName and Amount
        if (
          line[i] !== "0" &&
          line[i] !== "1" &&
          line[i] !== "2" &&
          line[i] !== "3" &&
          line[i] !== "4" &&
          line[i] !== "5" &&
          line[i] !== "6" &&
          line[i] !== "7" &&
          line[i] !== "8" &&
          line[i] !== "9"
        ) {
          amount = line.substring(0, i).trim();
          cardName = line.substring(i).trim();
          break;
        }
        // If number check was never passed add to badLines
        else if (i === line.length - 1 && cardName === "" && amount === "") {
          res.badLines.push(line);
        }
      }
      // If amount is not a number add to badLines
      if (cardName !== "" && isNaN(amount) === true) {
        res.badLines.push(line);
      }
      // If line contains only a number add to badLines
      else if (cardName === "" && isNaN(amount) === false) {
        res.badLines.push(line);
      }
      // If cardName is not blank and amount is a number
      if (cardName !== "" && isNaN(amount) === false) {
        const card = {
          name: cardName,
          ownedCount: amount,
          wishCount: 0
        };
        res.batch.cards.push(card);
      }
    });
    return res;
  };

  render() {
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <h3>Hello, {this.props.user.firstName}!</h3>
          <h3>This is your inventory.</h3>
        </Grid>
        <Grid item xs={6}>
          <BatchForm
            batchText={this.state.batchText}
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
          />
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={12}>
          {this.state.inventory.hasInventory ? (
            <InventoryTable
              inventory={this.state.inventory}
              handleFirstPageButtonClick={this.handleFirstPageButtonClick}
              handleBackButtonClick={this.handleBackButtonClick}
              handleNextButtonClick={this.handleNextButtonClick}
              handleLastPageButtonClick={this.handleLastPageButtonClick}
            />
          ) : (
            "Waiting for inventory to load."
          )}
        </Grid>
      </Grid>
    );
  }
}

Inventory.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Inventory);
