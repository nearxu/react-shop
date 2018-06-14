import React, { Component } from "react";
import Tab from "../../components/tab";
import Header from "../../components/header";

import { withRouter } from "react-router-dom";

import Commodity from "./commodity";
import Evaluate from "./evalute";

const Shop = () => {
  return <div>hello shop</div>;
};

@withRouter
export default class Index extends Component {
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
          <Evaluate key={1} data={1} />
          <Shop key={2} data={2} />
        </Tab>
      </div>
    );
  }
}
