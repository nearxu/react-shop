import React, { Component } from "react";
import { body, address } from "../../data/data.js";
import List from "../../components/list";
import { withRouter } from "react-router-dom";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: null,
      /*模拟第一页*/
      page: 0,
      noMore: false
    };
    this.flag = false;
  }
  componentWillMount() {
    this.setState({
      listData: body[0]
    });
  }
  componentDidMount() {
    document.addEventListener("scroll", this.loadMore.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener("scroll", this.loadMore.bind(this));
  }
  loadMore() {
    if (this.flag) return;
    if (this.state.noMore) return;
    let scrollTop = null;
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
      scrollTop = document.body.scrollTop;
    }
    if (
      window.document.body.offsetHeight - scrollTop <
      window.screen.height + 200
    ) {
      // window.document.body.offsetHeight;     返回当前网页高度
      // scrollTop // 网页被卷去的高
      //  window.screen.height 屏幕分辨率的高
      console.log(
        window.document.body.offsetHeight,
        "offsetheight",
        scrollTop,
        "scrolltop",
        window.screen.height,
        "sreentheight"
      );
      this.flag = true;
      setTimeout(() => {
        if (body[this.state.page + 1]) {
          this.setState({
            listData: [...body[this.state.page + 1], ...this.state.listData],
            page: this.state.page + 1
          });
        } else {
          this.setState({ noMore: true });
        }
        this.flag = false;
      }, 1000);
    }
  }
  render() {
    return (
      <div>
        {this.state.listData.map((value, index) => {
          return <List data={value} address={address.geohash} key={index} />;
        })}
        {this.state.noMore ? (
          <div className="noMore">没有更多了哦~</div>
        ) : (
          <div className="loadMore">
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
            >
              <path
                d="M955.261 575.322h-126.643c-34.955 0-63.322-28.37-63.322-63.322s28.37-63.322 63.322-63.322h126.643c34.955 0 63.322 28.37 63.322 63.322s-28.37 63.322-63.322 63.322v0zM780.616 332.925c-24.696 24.696-64.842 24.696-89.538 0s-24.696-64.842 0-89.538l89.538-89.538c24.696-24.696 64.842-24.696 89.538 0s24.696 64.842 0 89.538l-89.538 89.538zM512 1018.582c-34.955 0-63.322-28.37-63.322-63.322v-126.643c0-34.955 28.37-63.322 63.322-63.322s63.322 28.37 63.322 63.322v126.643c0 34.955-28.37 63.322-63.322 63.322v0zM512 258.707c-34.955 0-63.322-28.37-63.322-63.322v-126.643c0-34.955 28.37-63.322 63.322-63.322s63.322 28.37 63.322 63.322v126.643c0 34.955-28.37 63.322-63.322 63.322v0zM243.384 870.157c-24.696 24.696-64.842 24.696-89.538 0s-24.696-64.842 0-89.538l89.538-89.538c24.696-24.696 64.842-24.696 89.538 0s24.696 64.842 0 89.538l-89.538 89.538zM243.384 332.925l-89.538-89.538c-24.696-24.696-24.696-64.842 0-89.538s64.842-24.696 89.538 0l89.538 89.538c24.696 24.696 24.696 64.842 0 89.538-24.822 24.696-64.842 24.696-89.538 0v0zM258.707 512c0 34.955-28.37 63.322-63.322 63.322h-126.643c-34.955 0-63.322-28.37-63.322-63.322s28.37-63.322 63.322-63.322h126.643c34.955 0 63.322 28.37 63.322 63.322v0zM780.616 691.075l89.538 89.538c24.696 24.696 24.696 64.842 0 89.538s-64.842 24.696-89.538 0l-89.538-89.538c-24.696-24.696-24.696-64.842 0-89.538 24.822-24.696 64.842-24.696 89.538 0v0zM780.616 691.075z"
                fill="#555555"
              />
            </svg>
            <span>正在加载...</span>
          </div>
        )}
      </div>
    );
  }
}
