import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import CommodityComponent from "./commodityComponent";

@withRouter
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    axios
      .get(`/api/shopping/v2/menu?restaurant_id=${this.props.match.params.id}`)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return <CommodityComponent data={this.state.data} />;
  }
}
