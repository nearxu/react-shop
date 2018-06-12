import React, { Component } from "react";
import { BrowserRouter, Route, Switch, history } from "react-router-dom";
import "./app1.scss";

import Index from "./pages/index/index";
import Shop from "./pages/shop/shop";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Index} />
          <Switch>
            <Route path="/shop/:geohash/:id" component={Shop} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
