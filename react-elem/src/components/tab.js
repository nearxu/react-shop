import React, { Component } from "react";
import cx from "classnames";
import "./css/tab.scss";
export default class TabList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }
  handleClick(index) {
    if (index !== this.state.current) {
      this.setState({ current: index });
    }
  }
  render() {
    let { current } = this.state;
    return (
      <div>
        <div className="tabs_border_box">
          {this.props.data.map((value, index) => {
            return (
              <div
                key={index}
                className={cx(
                  "tabs_border",
                  current === index ? "tabs_border_active" : ""
                )}
                onClick={this.handleClick.bind(this, index)}
              >
                <span className="tabs_border_tag">{value.title}</span>
              </div>
            );
          })}
        </div>
        <div className="tabs_body">
          {React.Children.map(this.props.children, child => {
            return (
              <div
                className="scrollBoxL"
                style={{
                  display: `${
                    Number(child.key) === Number(this.state.current)
                      ? "block "
                      : "none"
                  }`
                }}
              >
                {child}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
