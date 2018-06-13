import React, { Component } from "react";
import Category from "./category";
import "./commodity.scss";
import MainList from "./mainList";
import ListCon from "./listCon";
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll: null,
      current: 0,
      num: 0,
      allPirce: 0,
      /*商家id*/
      id: 0,
      fatherCate: {},
      /*商家商品信息的存储*/
      foodsSave: {}
    };
    this.listHeight = [];
  }
  currentScroll = 0; // tab scroll
  currentMainScroll = 0; // 主体
  componentDidMount() {
    //   this.scrollTogether = this.scrollTogether.bind(this);
    // this.main.addEventListener('scroll',this.scrollTogether);
  }
  scrollTogether() {}
  componentDidUpdate() {
    if (this.props.data.length) {
      this.computeListHeight();
    }
  }
  /*计算右侧每一类别对应高度*/
  computeListHeight() {
    if (this.computeListHeight.flag) return;
    let allDt = this.listHeightDom;
    if (allDt.getElementsByTagName("dt").length !== 0) {
      for (let i = 0; i < allDt.getElementsByTagName("dt").length; i++) {
        this.listHeight.push({
          index: i,
          pos: allDt.getElementsByTagName("dt")[i].offsetTop
        });
      }
      this.computeListHeight.flag = true;
    }
  }
  // tab 点击跳转
  handleClickRun(id) {
    this.isScroll = false;
    this.animation(this.main, this.main.scrollTop, this.listHeight[id].pos);
    this.setState({ current: id });
  }
  /*滚动动画*/
  // 当前值
  // 目标值
  _isAnimate = null;
  animation(obj, now, target) {
    this.isScroll = false;
    window.cancelAnimationFrame(this._isAnimate);
    obj.scrollTop = Math.ceil(now + (target - now) / 4);
    if (obj.scrollHeight - obj.scrollTop <= obj.offsetHeight + 4) {
      obj.scrollTop = obj.scrollHeight - obj.offsetHeight;
      /*定时器是因为这个最后的滚动还没有完成就会触发滚动事件*/
      let timer = setTimeout(() => {
        this.isScroll = true;
        clearTimeout(timer);
      }, 50);
      return;
    } else if (Math.abs(obj.scrollTop - target) <= 4) {
      obj.scrollTop = target;
      let timer = setTimeout(() => {
        this.isScroll = true;
        clearTimeout(timer);
      }, 50);
      return;
    } else {
      this._isAnimate = requestAnimationFrame(() => {
        this.animation(this.main, obj.scrollTop, target);
      });
    }
  }

  filtter(para, arr) {
    return arr.filter((value, index) => {
      return para === value.item_id;
    });
  }
  handleSubmitCut() {}
  handleSubmit() {}
  render() {
    let id = this.state.id;
    let allSelected = this.state.foodsSave;
    let isSave = null;
    /*如果商家的商品的选中信息存在*/
    if (allSelected && allSelected[id]) {
      /*选中的商品*/
      isSave = allSelected;
    }
    let data = this.props.data ? this.props.data : [];
    // if (!data.length) return <div />;

    /*列表*/
    let listDomTab = data.map((value, index) => {
      return (
        <Category
          value={value}
          index={index}
          key={index}
          type={value.type}
          nums={this.state.fatherCate[value.id]}
          current={this.state.current}
          handleClickRun={this.handleClickRun.bind(this)}
        />
      );
    });
    /*主内容*/
    let listDomMain = data.map((value, index) => {
      /*内容*/
      let thisIndex = index;
      let listDomDes = value.foods.map((valueDes, index) => {
        return (
          <MainList
            alreadyNum={
              isSave
                ? this.filtter(valueDes.item_id, isSave[id][0].entities)
                    .length === 0
                  ? 0
                  : this.filtter(valueDes.item_id, isSave[id][0].entities)[0]
                      .quantity
                : 0
            }
            key={index}
            valueDes={valueDes}
            handleSubmitCut={this.handleSubmitCut.bind(
              this,
              thisIndex,
              index,
              valueDes.category_id,
              valueDes.item_id
            )}
            handleSubmit={this.handleSubmit.bind(
              this,
              thisIndex,
              index,
              valueDes.category_id,
              valueDes.item_id
            )}
          />
        );
      });
      return (
        /*标题*/
        <dl key={index}>
          <ListCon index={index} value={value} />
          {listDomDes}
        </dl>
      );
    });
    return (
      <div
        className="commodity"
        ref={body => {
          this.body = body;
        }}
      >
        <div className="commodity_box">
          <ul
            className="list_cont"
            ref={category => {
              this.category = category;
            }}
          >
            {listDomTab}
          </ul>
          <div
            className="commodity_main"
            ref={main => {
              this.main = main;
            }}
          >
            <div
              ref={listHeightDom => (this.listHeightDom = listHeightDom)}
              className="commodity_main_menu"
            >
              {listDomMain}
            </div>
          </div>
        </div>
        {/* <Footer 
    allPirce={this.state.allPirce} 
    num={this.state.num} 
    mainFoods={isSave?isSave[id][0].entities:[]} 
    data={this.props.basicData}
    handleFooterAdd={this.handleFooterAdd.bind(this)}
    handleFooterCut={this.handleFooterCut.bind(this)}
    emptyAllFodds={this.emptyAllFodds.bind(this)}
    /> */}
      </div>
    );
  }
}
