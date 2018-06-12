import React, { Component } from "react";
import "./css/search.scss";
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      support: false,
      css: null,
      height: 0
    };
  }
  componentDidMount() {
    if (
      CSS.supports("position", "sticky") ||
      CSS.supports("position", "-webkit-sticky")
    ) {
      // 支持 sticky,顶部吸附
      console.log("static");
      this.setState({
        support: true
      });
    } else {
      let offsetY = this.searchDOM.offsetTop;
      this.searchScrollTop = this.searchScrollTop.bind(this, offsetY);
      document.addEventListener("scroll", this.searchScrollTop);
    }
  }
  searchScrollTop(offsetY) {
    let css = null;
    let height = this.searchDom.offsetHeight;
    if (window.scrollY > offsetY) {
      css = {
        position: "fixed",
        top: 0,
        zIndex: 999
      };
    } else {
      css = {
        position: "static"
      };
    }
    this.setState({
      css,
      height
    });
  }
  render() {
    return (
      <div
        className="search_Box"
        style={
          this.state.support
            ? { position: "sticky", top: "-1px", zIndex: 999 }
            : { height: this.state.height === 0 ? null : this.state.height }
        }
      >
        <div
          ref={div => {
            this.searchDOM = div;
          }}
          className="search"
          style={this.state.support ? null : this.state.css}
        >
          <a className="search_content">
            <i className="search_icon" />
            <span className="search_placeholder">搜索商家、商品名称</span>
          </a>
        </div>
      </div>
    );
  }
}
