// React
import React, { Component } from 'react';
//components
import Nav from '../../components/Nav';
import CardInfo from "../../components/CardInfo";
import {Row, Col} from "../../components/grid";
import CardSearchAPI from "../../utils/cardInfoAPI";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards : []
    };

    this.componentDidMount.bind(this);
  }

  componentDidMount() {
    CardSearchAPI.searchCardName(this.props.match.params.name)
    .then(res => {
      let filteredCardNames = Array.from(new Set(res.data));
      this.setState({
        cards: res.data
      })
    })
    .catch(err => console.log(err));
  }

  render (){
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
        {this.state.cards ? this.state.cards.map( card => <CardInfo {...card} />) : <h2>Nothing!</h2>}
        </Row>
        </Col>
      </Row>
    </div>
    );
  };
}
  

export default Search;
