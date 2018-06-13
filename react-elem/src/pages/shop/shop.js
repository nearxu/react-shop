import React, { Component } from "react";
import Tab from "../../components/tab";
import Header from "../../components/header";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Commodity from "./commodity";

@withRouter
export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // axios
    //   .get(
    //     `/api/shopping/restaurant/${
    //       this.props.match.params.id
    //     }?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification`
    //   )
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
  render() {
    const data = [
      {
        title: "商品",
        num: 0
      },
      {
        title: "评价",
        num: 2
      },
      {
        title: "店铺",
        num: 3
      }
    ];
    return (
      <div>
        <Header title="店铺首页" />
        <Tab data={data}>
          <Commodity key={0} data={0} />
          <Commodity key={1} data={1} />
          <Commodity key={2} data={2} />
        </Tab>
      </div>
    );
  }
}
