import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./CardImage.module.css";

class CardImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: ""
    };

    this.componentDidMount.bind(this);
  }

  componentDidMount() {
    axios({
      url: `https://api.scryfall.com/cards/multiverse/${
        this.props.multiverseId
      }`,
      method: "get",
      data: {
        format: "image"
      }
    }).then(res => {
      this.setState({
        name: res.data.name,
        image: res.data.image_uris.large
      });
    });
  }

  componentWillReceiveProps(newProps) {
    window.location.reload();
  }

  render() {
    const queryURL = `/search/name/${this.state.name}`;

    return (
      <Link to={queryURL}>
        <img className={styles.search_img} src={this.state.image} />
      </Link>
    );
  }
}

export default CardImage;
