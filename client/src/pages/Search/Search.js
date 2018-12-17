// React
import React, { Component } from "react";
// Material UI
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
//components
import Nav from "../../components/Nav";
import { Row, Col } from "../../components/grid";
import CardInfo from "../../components/CardInfo";
import CardImage from "../../components/CardImage";
// API
import CardSearchAPI from "../../utils/cardInfoAPI";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };

    this.componentDidMount.bind(this);
  }

  componentDidMount() {
    CardSearchAPI.searchCardName(this.props.match.params.name)
      .then(res => {
        let filteredCardNames = Array.from(new Set(res.data));
        this.setState({
          cards: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Nav
          isPublic={true}
          // username={this.props.user.username}
          onSearch={this.props.onSearch}
          handleSearch={this.props.handleSearch}
          // logOut={() => props.authLogout(this.props.user.username)}
        />
        <Row>
          <h2>Cards?</h2>
          <Col size={12}>
            <Row>
              {this.state.cards &&
                this.state.cards.length > 1 &&
                this.state.cards.map(card => (
                  <Grid item xs={3}>
                    <CardImage multiverseId={card.multiverseId} />
                  </Grid>
                ))}
              {this.state.cards &&
                this.state.cards.length === 1 &&
                this.state.cards.map(card => <CardInfo {...card} />)}
              {!this.state.cards && <h2>Nothing!</h2>}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Search;
