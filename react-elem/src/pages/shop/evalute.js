import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Evaluate from "./evaluateComponent";
@withRouter
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluateData: [],
      tags: [],
      pj: {}
    };
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    // 头评价
    let pj = this.getData(`/api/ugc//v2/restaurants/${id}/ratings/scores`);
    let evaluateData = this.getData(
      `/api/ugc/v2/restaurants/${id}/ratings?has_content=true&offset=0&limit=10`
    );
    let tags = this.getData(`/api/ugc/v2/restaurants/${id}/ratings/tags`);
    console.log(evaluateData, pj, tags, "evaluateData,pj,tags111");
    Promise.all([pj, evaluateData, tags]).then(result => {
      this.setState({
        evaluateData: result[1],
        tags: result[2],
        pj: result[0]
      });
    });
  }
  getData(url) {
    return axios
      .get(url)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Evaluate
        pj={this.state.pj}
        tags={this.state.tags}
        evaluateData={this.state.evaluateData}
      />
    );
  }
}
