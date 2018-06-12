import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "../../components/header";
import Search from "../../components/search";
import ListItem from "./listItem";
export default class Index extends Component {
  componentDidMount() {
    console.log(this.props, "props mount");
  }
  render() {
    return (
      <div>
        <Header />
        <Search />
        <ListItem />
      </div>
    );
  }
}
