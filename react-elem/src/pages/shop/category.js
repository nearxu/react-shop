import React, { Component } from "react";

export default class Index extends Component {
  /*图片格式化*/
  _formatImg(src) {
    let png = /png/g.test(src);
    src = `${src}${png ? ".png" : ".jpeg"}`;
    let imgValue = src.split("");
    imgValue.splice(3, 0, "/");
    imgValue.splice(1, 0, "/");
    return imgValue.join("");
  }
  handleClickRun() {
    if (this.props.handleClickRun) {
      this.props.handleClickRun(this.props.index);
    }
  }
  render() {
    let num = 0;
    if (this.props.nums) {
      num = this.props.nums.num;
    }
    return (
      <li
        className={`${this.props.current === this.props.index ? "active" : ""}`}
        onClick={this.handleClickRun.bind(this, this.props.index)}
      >
        {this.props.type === 1 && num !== 0 ? (
          <span className="category_tip">{num}</span>
        ) : null}
        {this.props.value.icon_url !== "" ? (
          <img
            alt={this.props.value.name}
            src={`//fuss10.elemecdn.com/${this._formatImg(
              this.props.value.icon_url
            )}?imageMogr/format/webp/thumbnail/18x/`}
          />
        ) : (
          ""
        )}
        <span>{this.props.value.name}</span>
      </li>
    );
  }
}
