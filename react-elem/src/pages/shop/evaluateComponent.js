import React, { Component } from "react";
import Star from "../../components/star";
import "./evaluate.scss";
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {
        index: 0,
        /*当前数据*/
        data: [],
        /*是否第一次加载*/
        flag: false
      }
    };
  }
  render() {
    // let tags=this.props.tags.map((value,index)=>{
    //     return <EvaluateTab
    //         handleClickTags={this.handleClickTags.bind(this)}
    //         value={value}
    //         currentIndex={this.state.current.index}
    //         key={index}
    //         index={index}/>
    // })
    let mainDom = this.state.current.data.map((value, index) => {
      return (
        <li key={index} className="evaluate_body_li">
          <div className="evaluate_body_li_box">
            <img
              className="evaluate_body_li_img"
              src="https://fuss10.elemecdn.com/c/f5/d0b0f2fc83f3ac3e4a0cfae891256png.png?imageMogr/format/webp/thumbnail/!60x60r/gravity/Center/crop/60x60/"
              alt={value.username}
            />
            <div className="evaluate_body_li_main">
              <div className="evaluate_body_li_main_1">
                <h3>{value.username}</h3>
                <small>{value.rated_at}</small>
              </div>
            </div>
            {/* <Star rating={value.rating_star}/> */}
            {value.rating_text.length !== 0 ? (
              <div className="evaluate_body_li_main_pl">
                {value.rating_text}
              </div>
            ) : null}
            <ul className="evaluate_body_li_main_exm">
              {value.item_ratings.map((value2, index) => {
                if (value2.image_hash.length === 0) {
                  return null;
                }
                return (
                  <li key={index}>
                    <img
                      src={`//fuss10.elemecdn.com/${this._formatImg(
                        value2.image_hash
                      )}?imageMogr/format/webp/`}
                      alt={value2.food_name}
                    />
                  </li>
                );
              })}
            </ul>
            <div>
              <ul className="evaluate_body_li_main_word">
                {value.item_ratings.map((value, index) => {
                  return <li key={index}>{value.food_name}</li>;
                })}
              </ul>
            </div>
          </div>
        </li>
      );
    });
    return (
      <div
        className="box"
        ref={body => {
          this.body = body;
        }}
      >
        <section className="evaluate_title">
          <div className="evaluate_title_num">
            <strong className="evaluate_title_source">
              {Number(this.props.pj.overall_score).toFixed(1)}
            </strong>
            <p className="evaluate_title_2">综合评价</p>
            <p className="evaluate_title_3">
              高于周边商家{Number(this.props.pj.compare_rating * 100).toFixed(
                1
              )}%
            </p>
          </div>
          <div className="evaluate_score">
            <div className="evaluate_score_0">
              <span>服务态度</span>
              <span className="evaluate_star_0">
                <Star rating={4.5} />
                <span className="evaluate_star_1">
                  {Number(this.props.pj.service_score).toFixed(1)}
                </span>
              </span>
            </div>
            <div className="evaluate_score_0">
              <span>菜品评价</span>
              <span className="evaluate_star_0">
                <Star rating={4.5} />
                <span className="evaluate_star_1">
                  {Number(this.props.pj.food_score).toFixed(1)}
                </span>
              </span>
            </div>
            <div className="evaluate_score_0">
              <span>送达时间</span>
              <span className="evaluate_star_0">
                {this.props.pj.deliver_time}分钟
              </span>
            </div>
          </div>
        </section>
        <section className="evaluate_body">
          <div className="evaluate_body_title">
            <ul>{/* {tags} */}</ul>
          </div>
          <ul>{mainDom}</ul>
        </section>
      </div>
    );
  }
}
